import xml.etree.ElementTree as ET
import os
import requests
from datetime import datetime

XML_FILES = [
    "evolution_settings_themes.xml",
    "evolution_settings_lock_screen.xml",
    "evolution_settings_status_bar.xml",
    "evolution_settings_quick_settings.xml",
    "evolution_settings_notifications.xml",
    "evolution_settings_power_menu.xml",
    "evolution_settings_miscellaneous.xml",
]

# Android namespace
ANDROID_NS = '{http://schemas.android.com/apk/res/android}'

def fetch_file(repo, path, ref="vic"):
    """Fetch a file from GitHub."""
    url = f"https://raw.githubusercontent.com/{repo}/{ref}/{path}"
    try:
        response = requests.get(url)
        response.raise_for_status()
        print(f"✅ Successfully fetched {path}")
        return response.text
    except requests.RequestException as e:
        print(f"Error fetching {path}: {e}")
        print(f"URL attempted: {url}")
        return None

def get_string_resource(strings_root, string_name):
    """Get string resource value from strings.xml."""
    if not string_name:
        return None
    
    # Remove '@string/' prefix if present
    string_name = string_name.replace('@string/', '')
    
    # Find the string resource
    string_elem = strings_root.find(f".//string[@name='{string_name}']")
    if string_elem is not None and string_elem.text:
        return string_elem.text.replace('\\\'', "'").replace('\n', ' ').strip()
    return None

def get_attribute(elem, attr):
    """Get attribute value with proper namespace handling."""
    return elem.get(f'{ANDROID_NS}{attr}') or elem.get(attr)

def process_preference(elem, strings_root, current_category):
    """Process a preference element and return its markdown content."""
    title_ref = get_attribute(elem, 'title')
    title = get_string_resource(strings_root, title_ref)
    summary_ref = get_attribute(elem, 'summary')
    summary = get_string_resource(strings_root, summary_ref)
    
    if not title:
        print(f"⚠️  Warning: No title found for preference with ref: {title_ref}")
        title_ref = get_attribute(elem, 'key')
        if title_ref:
            title = title_ref.replace('_', ' ').title()
    
    if not title:
        return ""
    
    content = f"### {title}\n\n"
    if summary:
        content += f"{summary}\n\n"
    return content

def process_category(elem, strings_root):
    """Process a PreferenceCategory element and return its markdown content."""
    title_ref = get_attribute(elem, 'title')
    title = get_string_resource(strings_root, title_ref)
    
    if not title:
        key = get_attribute(elem, 'key')
        if key:
            title = key.replace('_', ' ').title()
        else:
            print(f"Warning: No title found for category with ref: {title_ref}")
            return ""
    
    content = f"## {title}\n\n"
    
    # Process child preferences
    for child in elem:
        if any(x in child.tag for x in ['Preference', 'CheckBox', 'Switch', 'List']):
            content += process_preference(child, strings_root, title)
    
    return content

def process_xml_file(xml_content, strings_root, filename):
    """Process a preferences XML file and return its markdown content."""
    try:
        # Register the Android namespace
        ET.register_namespace('android', 'http://schemas.android.com/apk/res/android')
        root = ET.fromstring(xml_content)
        content = ""
        
        # Get the main title from the filename first
        base_name = filename.replace('evolution_settings_', '').replace('.xml', '')
        title_key = f"{base_name}_title"
        main_title = get_string_resource(strings_root, title_key)
        
        if not main_title:
            # Use filename as fallback title
            main_title = base_name.replace('_', ' ').title()
        
        content += f"# {main_title}\n\n"
        
        # Get summary if available
        summary_key = f"{base_name}_summary"
        summary = get_string_resource(strings_root, summary_key)
        if summary:
            content += f"{summary}\n\n"
        
        # Process categories and preferences
        for elem in root:
            if 'PreferenceCategory' in elem.tag:
                content += process_category(elem, strings_root)
            elif any(x in elem.tag for x in ['Preference', 'CheckBox', 'Switch', 'List']):
                content += process_preference(elem, strings_root, None)
        
        return content.rstrip() + "\n"
    except ET.ParseError as e:
        print(f"Error parsing XML file {filename}: {e}")
        print("XML content:")
        print(xml_content[:200] + "...") # Print first 200 chars
        return None

def main():
    repo = "Evolution-X/packages_apps_Evolver"
    print("Starting documentation generation...")
    
    # Fetch strings.xml
    print("Fetching strings.xml...")
    strings_xml = fetch_file(repo, "res/values/evolution_strings.xml")
    if not strings_xml:
        print("Failed to fetch strings.xml")
        return
    
    try:
        strings_root = ET.fromstring(strings_xml)
        print("Successfully parsed strings.xml")
    except ET.ParseError as e:
        print(f"Error parsing strings.xml: {e}")
        return
    
    # Create output directory
    os.makedirs("evolution-settings", exist_ok=True)
    print("Created evolution-settings directory")
    
    # Process each XML file
    categories = {}
    for xml_file in XML_FILES:
        print(f"\n🔍 Processing {xml_file}...")
        xml_content = fetch_file(repo, f"res/xml/{xml_file}")
        if xml_content:
            content = process_xml_file(xml_content, strings_root, xml_file)
            if content:
                filename = xml_file.replace(".xml", ".md").replace("evolution_settings_", "")
                filepath = os.path.join("evolution-settings", filename)
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(content)
                print(f"✅ Generated {filename}")
                
                # Get the first heading as category name
                first_line = content.split('\n')[0]
                if first_line.startswith('# '):
                    category_name = first_line[2:].strip()
                    categories[category_name] = filename
    
    # Create index file
    index_path = os.path.join("evolution-settings", "home.md")
    with open(index_path, "w", encoding="utf-8") as f:
        f.write("# Evolution X Features Documentation\n\n")
        f.write(f"*This is an autogenerated file, generated on: {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')}*\n\n")
        f.write("## Categories\n\n")
        for category, filename in sorted(categories.items()):
            f.write(f"- [{category}]({filename})\n")
    
    print(f"\n✅ Documentation generated successfully in {os.path.abspath('evolution-settings')}")

if __name__ == "__main__":
    main()