export default {
  index: <Entry title="Home" icon="home" />,
  "###": {
    type: "separator",
    title: "Guides",
  },
  "setting-up-env": (
    <Entry title="Setting up environment" icon="manufacturing" />
  ),
  "setting-up-env-latest-lts": (
    <Entry title="Setting up environment latest LTS" icon="terminal" />
  ),
  "setting-up-custom-ota": (
    <Entry title="Setting up custom OTA" icon="system_update" />
  ),
  lunch: <Entry title="Lunch guide" icon="restaurant" />,
  build_flags: <Entry title="Build flags" icon="flag" />,
  "reporting-a-bug": <Entry title="Reporting a bug" icon="bug_report" />,
  "installing-evolution-x": (
    <Entry title="Installing Evolution X" icon="get_app" />
  ),
  "####": {
    type: "separator",
    title: "Maintainer",
  },
  "apply-for-maintainership": (
    <Entry title="Apply for maintainership" icon="groups" />
  ),
  onboarding: <Entry title="Onboarding" icon="waving_hand" />,
  "code-of-conduct": <Entry title="Code of conduct" icon="book" />,
  "#####": {
    type: "separator",
    title: "Questions & Answers",
  },
  "support-new-device": <Entry title="Support new device" icon="smartphone" />,
  "evolution-settings": <Entry title="Features" icon="settings" />,
};

function Entry({ icon, title }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span className="material-symbols-rounded">{icon}</span>
      <span style={{ marginLeft: 8 }}>{title}</span>
    </div>
  );
}
