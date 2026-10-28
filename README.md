# launch of exploration

The problem and system

How employers can identify capable graduates without traditional work experience. Graduates may have relevant project experience but employers often need a quick way to understand an individual's contribution and compare evidence against a role. Graduates may also lack useful feedback after an unsuccessful application.

The system includes graduates, employers and recruiters, educators, mentors and project owners. Employers control role requirements and hiring decisions; graduates control the evidence they submit. A future verification process would depend on a willing and trustworthy verifier. Review time, access to projects, employer incentives and application feedback all influence outcomes.

Working assumptions, not research findings: employers will find concise, role-relevant evidence useful; graduates can describe their contributions and specific feedback will help them improve subsequent applications. These assumptions need testing.

### Intervention considered

Generic CV advice could help graduates describe their work, but it does not itself give employers a consistent way to review the underlying evidence. This prototype instead connects a project and short practical challenge to a sample role, then provides a common review rubric and a visible next step. This is a design choice to test, not proof that it improves hiring.

## What the prototype does

**Graduate view**

- Edit a sample project, its skills, contribution and supporting link.
- Save a written response to a practical challenge.
- View an Evidence-to-Opportunity Path showing supported skills, missing evidence and a next action. This uses predefined rules, not AI.
- Review a Capability Card built from the sample evidence.
- See sample recruiter feedback and an illustrative alternative opportunity.
- Generate and edit a CV/portfolio draft using the sample employer's preferences.

**Employer view**

- Review sample candidates and their project and challenge evidence.
- Turn on blind review to hide candidate names.
- Score relevant skills, project evidence and practical problem-solving from 1–5 with notes. The overall score reflects the employer's selections.
- Shortlist locally and enter feedback or an illustrative alternative opportunity.

## Technology and data

The supplied screenshots show a responsive Lovable front-end prototype using sample data and browser-local storage. No backend, authentication, external API or AI integration is part of the requested prototype. **Before submitting, replace this paragraph with the actual frameworks, libraries and versions listed in your repository.**

Demo changes are stored in the current browser. They are not shared with other users or devices. Clearing browser storage may remove them.

## Setup and run

1. Export or connect the Lovable project to GitHub and confirm that reviewers can access the repository.
2. Inspect the repository's package file and add its exact prerequisites, install command and start command here.
3. Add the local URL printed by the development server and any required build command.
4. Alternatively, add a working published demo URL and clear access instructions above.


## Suggested demonstration

1. Open **Graduate view** and save a project with an individual contribution.
2. Save a practical challenge response and inspect the Capability Card and next step.
3. Open **Employer view**, turn on blind review and open a candidate.
4. Score each criterion, add evidence-based notes and shortlist for review.
5. Enter constructive feedback and a suggested alternative; return to the graduate view to explore the sample feedback and CV draft.

The exact behaviour should be checked against the running build before presenting. 

## Evidence and validation status
No user interviews, usability tests, employer validation or employment outcomes have been provided. Claims that the app improves hiring or reduces bias are therefore hypotheses.

A small next test could ask several graduates to complete the evidence path and several employers to review identical sample cards. Record completion, time to review, whether the next step is understood, and whether each score can be connected to evidence. Collect consent and avoid presenting a small test as proof of hiring impact.

## Fairness, privacy and limitations

- Scores come from the employer's selections. The rubric supports human judgment and does not make hiring decisions or eliminate bias.
- Project opportunities and access to evidence may be unequal. A future pilot should offer different ways to demonstrate skills.
- **Verified in demo** is fictional sample data, not a live verification service. A future version could allow educators, mentors or project owners to verify contributions with consent.
- Avoid requesting age, gender, race, photos or other details unrelated to the assessment.
- Feedback and alternative opportunities are demo content. The prototype does not send applications, messages or referrals, and cannot guarantee an interview or job.
- Browser-local storage is unsuitable for a real multi-user service. A production system would need security, access controls, consent, retention rules and accessibility testing.
- The CV draft must be reviewed and corrected by the graduate. It must not invent qualifications, outcomes or employment history.

## Proposed next steps

1. Validate the problem and assumptions with graduates and employers.
2. Test accessibility and the clarity of the path, rubric and feedback.
3. Explore a consent-based pilot, secure storage and real verification with participating organisations.
4. Measure application progress and review quality before making impact claims.

## Sources and disclosure

- All names, roles and companies visible in the prototype are sample data unless independently confirmed.
- **Tools and assistance:** [List Lovable, AI assistance, reused code and other tools actually used. Explain your own contribution honestly.]
