const jobId =  "654e18b653a7667de6ef59ec";
 // Example job ID
const bookmarkUrl = `/jobs/${jobId}`;

describe('Bookmark Functionality', () => {
    it('should bookmark a job', function () {
        // Visiting the correct job details page
        cy.visit('http://localhost:3000/bookmark');

        // Click the bookmark button and perform assertions
        cy.get('[data-testid="bookmark-button"]').click();

        // Assertion to verify the job is bookmarked
        cy.get('[data-testid="bookmark-button"]').should('have.class', 'bookmarked');

        // Additional logic to verify that the job appears in the bookmarked list
        // cy.visit('/bookmark'); // Assuming you have a bookmarks page
        // cy.contains(jobId).should('exist'); // Verify the job ID exists in the bookmarked list
    });

    it('should unbookmark a job', function () {
        // Visiting the correct job details page
        cy.visit('http://localhost:3000/bookmark');

        // Assuming the job is already bookmarked, click to unbookmark
        cy.get('[data-testid="bookmark-button"]').click();

        // Assertion to verify the job is unbookmarked
        cy.get('[data-testid="bookmark-button"]').should('not.have.class', 'bookmarked');

        // Verify that the job no longer appears in the bookmarked list
        // cy.visit('/bookmarks');
        // cy.contains(jobId).should('not.exist');
    });
});