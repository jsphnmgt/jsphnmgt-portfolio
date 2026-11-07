import { assets } from "../../../assets";
import { useState } from "react";
const certificates = [
  {
    title: "Cyber Threat Management",
    year: "2026",
    issuer: "Cisco Networking Academy",
    dateEarned: "September 16, 2026",
    image: assets["cyberThreatManagement-certificate.png"],
    credentialUrl: "https://www.credly.com/badges/9bec74d6-e4e4-432e-88d9-c67c274980e8/public_url",
    description: "Completed training in vulnerability assessment, risk management, incident response, disaster recovery, and security investigations."
  },
  {
    title: "Data Analytics Essentials",
    year: "2026",
    issuer: "Cisco Networking Academy",
    dateEarned: "March 18, 2026",
    image: assets["dataAnalytics-certificate.png"],
    credentialUrl: "https://www.credly.com/badges/05ad9f3a-74c5-4ba4-bb8e-2c9793ac891f/public_url",
    description: "Completed training in data preparation, statistical analysis, and hands-on work with Excel, SQL, and Tableau."
  },
  {
    title: "AWS Academy Graduate - Cloud Foundations - Training Badge",
    year: "2026",
    issuer: "AWS Academy",
    dateEarned: "March 16, 2026",
    image: assets["AWS-certificate.png"],
    credentialUrl: "https://www.credly.com/badges/5c9b7ac6-ceac-4c8a-aab5-6696cf2b1930/public_url",
    description: "Completed 20 hours of AWS Academy Cloud Foundations training."
  },
  {
    title: "AI Fundamentals with IBM SkillsBuild",
    year: "2026",
    issuer: "Cisco Networking Academy / IBM SkillsBuild",
    dateEarned: "March 3, 2026",
    image: assets["AIfundamentals-certificate.png"],
    credentialUrl: "https://www.credly.com/badges/2c658acd-7392-4881-9862-80703aec204d/public_url",
    description: "Completed introductory training in artificial intelligence through Cisco Networking Academy and IBM SkillsBuild."
  },
  {
    title: "Artificial Intelligence Fundamentals",
    year: "2026",
    issuer: "IBM SkillsBuild",
    dateEarned: "March 3, 2026",
    image: assets["artificialIntelligenceFundamentals-certificate.png"],
    credentialUrl: "https://www.credly.com/badges/d35517bf-ac24-4008-8d1d-a75f53bac9ff/public_url",
    description: "Completed the requirements for the Artificial Intelligence Fundamentals credential from IBM SkillsBuild."
  },
  {
    title: "Endpoint Security",
    year: "2025",
    issuer: "Cisco Networking Academy",
    dateEarned: "August 13, 2025",
    image: assets["endpointSecurity-certificate.png"],
    credentialUrl: "https://www.credly.com/badges/8950695f-169c-48e8-b65c-e021d687538f/public_url",
    description: "Completed training in endpoint security, network threat mitigation, malware analysis, and secure network configuration."
  },
  {
    title: "Relational Database V8",
    year: "2025",
    issuer: "freeCodeCamp",
    dateEarned: "February 5, 2025",
    image: assets["relational-database-certificate.png"],
    credentialUrl: "https://www.freecodecamp.org/certification/jsphnmgt/relational-database-v8",
    description: "Earned the Relational Database V8 Developer Certification from freeCodeCamp, representing approximately 300 hours of coursework and project work."
  },
  {
    title: "JavaScript Essentials 1",
    year: "2024",
    issuer: "Cisco Networking Academy / OpenEDG JS Institute",
    dateEarned: "October 25, 2024",
    image: assets["javascriptEssentials-certificate.png"],
    credentialUrl: "https://www.credly.com/badges/07f104b5-284c-4615-94f1-a488be2186e4/public_url",
    description: "Completed training in JavaScript fundamentals, including variables, data types, flow control, functions, and debugging."
  },
  {
    title: "Introduction to Figma",
    year: "2024",
    issuer: "Simplilearn SkillUp",
    dateEarned: "September 19, 2024",
    image: assets["figma-certificate.png"],
    credentialUrl: assets["figma-certificate.png"],
    description: "Completed the Introduction to Figma online course through Simplilearn SkillUp. Certificate code: 7386240."
  },
  {
    title: "Responsive Web Design",
    year: "2024",
    issuer: "freeCodeCamp",
    dateEarned: "August 25, 2024",
    image: assets["responsive-web-design-certificate.png"],
    credentialUrl: "https://www.freecodecamp.org/certification/jsphnmgt/responsive-web-design",
    description: "Earned the Responsive Web Design Developer Certification from freeCodeCamp, representing approximately 300 hours of coursework and project work."
  },
  {
    title: "CompTIA IT Fundamentals+ (ITF+) Certification",
    year: "2023", issuer: "CompTIA",
    dateEarned: "November 23, 2023",
    image: assets["comptia-certificate.png"],
    credentialUrl: "https://www.credly.com/badges/c0fc5d0f-96df-4c9a-ac49-d79461699fdc/public_url",
    description: "Certification in foundational information technology concepts and skills."
  }
];
export default function Certificates({ onCardClick }) {
  const [showAll, setShowAll] = useState(false);
  const visibleCertificates = showAll ? certificates : certificates.slice(0, 6);
  return <section id="certificates" aria-labelledby="certificates-title">
    <p className="chapter-label">Courses &amp; credentials</p>
    <h2 id="certificates-title" className="display-heading">Certificates</h2>
    <p className="section-subtitle">Professional achievements and certificates</p>
    <div className="certificates-grid" id="certificate-collection">{visibleCertificates.map(certificate => <article className="certificate-card" key={certificate.title}>
      <div className="certificate-card-heading">
        <span className="certificate-seal" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" focusable="false"><path d="M13 18H4V4h16v9M7 8h10M7 11h5" /><circle cx="17" cy="16" r="3" /><path d="m15 18.3-1 4 3-1.5 3 1.5-1-4" /></svg></span>
        <h3>{certificate.title}</h3>
      </div>
      <p className="certificate-issuer">{certificate.issuer}</p>
      <div className="certificate-footer">
        <button aria-label={`View ${certificate.title} certificate`} aria-haspopup="dialog" onClick={() => onCardClick({ ...certificate, type: "certificate" })}><img src={assets["view-certificate.png"]} alt="" />View Certificate</button>
        <span>{certificate.year}</span>
      </div>
    </article>)}</div>
    <div className="certificate-collection-footer"><span>{visibleCertificates.length} of {certificates.length} certificates</span><button type="button" className="certificate-collection-toggle" aria-expanded={showAll} aria-controls="certificate-collection" onClick={() => setShowAll(current => !current)}>{showAll ? "Show fewer certificates" : "View all certificates"}<span aria-hidden="true">{showAll ? "−" : "+"}</span></button></div>
  </section>;
}
