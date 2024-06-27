import React from "react";
import { Link } from "react-router-dom";
import "./css/DataDictionary.css";

function DataDictionary() {
  return (
    <>
      <div className="header">
        <h1>Data Dictionary</h1>
        <p>
          This page contains defintions for the metrics provided in the
          dashboard. For any questions, please reach out to{" "}
          <a href="mailto:enrollment@cahpsa.berkeley.edu">
            enrollment@cahpsa.berkeley.edu
          </a>
          . <br></br> To return to the Dashboard, click{" "}
          <Link to="/afmc-dashboard">here</Link>.
        </p>
      </div>

      <div className="content">
        <p>
          The dashboard contains metrics on both <b>submitted applications</b>{" "}
          and <b>verified enrollments</b> starting with the beginning of
          CaHPSA's partnership with AFMC in May 2023.{" "}
          <em>Both metrics track individuals, not applications themselves.</em>{" "}
          Although a family with four members needing coverage may only have one
          application submitted, they will be counted as{" "}
          <b>four Submitted Applications</b> to be able to account for
          individuals who may apply together but end up enrolling in separate
          programs.
          <h2>Submitted Applications</h2>
          Submitted Applications track the number of individuals for which
          CaHPSA CEC's have submitted (or have helped patients to submit)
          applications to health insurance programs (Medi-Cal, Covered
          California plans, HealthPAC, etc.). Individuals who submit multiple
          applications for any reason (renewals, resubmissions, etc.) are
          counted for each time they apply. For applications where other
          household members are included on the application but are not applying
          for insurance, only those who apply for insurance are included.
          <br></br>
          <br></br>
          <em>
            Example: A family of four (two parents and two minor children) apply
            for health insurance through Covered California. One parent is
            dually-eligible for Medi-Cal and Medicare; the other parent has
            insurance. Their children are also both eligible for Medi-Cal.{" "}
            <b>
              Although only one application was submitted for the family (on
              which all four members were included) three Submitted Applications
              would be counted: one under Other (the dually-eligible parent) and
              two under Medi-Cal (the children).
            </b>
          </em>
          <h2>Verified Enrollments</h2>
          Verified Enrollments track the number of individuals for which CaHPSA
          CEC's have submitted (or have helped patients to submit) applications
          to health insurance programs (Medi-Cal, Covered California plans,
          HealthPAC, etc.){" "}
          <em>
            and whose enrollment into some health insurance program has been
            verified
          </em>
          . Individuals may be counted multiple times if they successfully apply
          and enroll in a program, gain eligibility for a different program and
          subsequently successfully apply and enroll. This metric in particular
          is measured as a means of ensuring CEC follow up with patients. If
          patients are do not to enroll after submitting an application, that
          should be noted in the patient's ticket for monitoring purposes and
          continuous improvement.
          <br></br> <br></br>
          <em>
            Example: A family of four (two parents and two minor children)
            applies for coverage through Covered California. One parent is
            deemed eligible for a Covered California plan while the other is
            deemed conditionally eligible for Medi-Cal pending submission of
            proof of income documents. Both children are eligible for Medi-Cal.
            The patient does not return to clinic after submitting the
            application although the Covered California portal indicates
            successful enrollment for the Covered-California-eligible parent and
            the two children.{" "}
            <b>
              Although the other parent may have submitted proof of income
              documents on their own and successfully enrolled in Medi-Cal,
              since the determination of successful enrollment cannot be made,
              only three Verified Enrollments are counted.
            </b>
          </em>
        </p>
      </div>
    </>
  );
}

export default DataDictionary;
