# Instructions
The assignment consists of a user story. The goal is to determine your attention to detail as well as your ability to communicate to us details concerning how you would implement the story. Please read through the story below and write down any questions or areas of confusion you have and email me back. We are looking to see how you would go about create a full stack implementation of the story below. You have the option of coding, design, infrastructure architecture, etc to demonstrate how you would tackle a problem that you will be seeing day to day. Focus on the things that you excel at and display that as your proposed solution. **You will have 4 days to finish this assignment**.

# User Story & Mock
As studio gym manager, I want my prospects and customers to be placed into the correct follow-up status based on their origin, created date, calendar events, recurring services, payments, and sessions remaining, so that I can use Club OS to follow up with prospects and customers.

# Customer Statuses
The following groups of customers help identify which Follow-Up status should be calculated.
*Customers with Agreement Purchases*
The following are the follow up statuses for a customer that has a long term agreement:
* If the agreement is in good standing (active, not suspended, with no past-due balance) Active Customer
* If the agreement has a past due balance greater than 0, the status is Delinquent Customer
* If the agreement is suspended, the status is Active Customer - Suspended
* If the purchase was for a quantity of 1 and they have 0 sessions available, the status should be Drop-In
* If the purchase was for 1 session and the customer has 1 or more sessions remaining, the status is Renewal Opportunity
* If the agreement status is inactive with an alert of Canceled, the status is Canceled Customer
* If the agreement status is inactive with an alert of Expired, the status is Expired Customer
* If the agreement status is Collections, the status is Collections Customer

# Agreement Data Structure
* Purchase date: Date
* Session Quantity Purchases: Integer
* Agreement Status: String

# Acceptance Criteria
1. Users are placed into the appropriate follow-up status as laid out in this document
2. Unit tests exist and pass for each of the statuses.

# Scaling Consideration
* How does your approach handle millions of requests per hour?
* How would you monitor the health of this service?
* How are you going to handle many users changing data?
