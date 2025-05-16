import React from "react";
import { Tabs } from "antd";
import Certifications from "./Certifications";
import Honors from "./Honors";
import Publications from "./Publications";

const EmployeeAdditionalInfo = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Additional Information</h2>
      <Tabs defaultActiveKey="certifications">
        <Tabs.TabPane tab="Certifications & Licenses" key="certifications">
          <Certifications />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Honors & Distinctions" key="honors">
          <Honors />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Publications" key="publications">
          <Publications />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default EmployeeAdditionalInfo;