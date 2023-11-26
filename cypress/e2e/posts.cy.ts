describe("Visit home page", () => {
  const URL = "http://localhost:5173/";

  it("Visits page", () => {
    cy.visit(URL);
    cy.contains("Ignas");
    cy.contains("Front-end developer");
    cy.contains("Created by user:");
    cy.contains(
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
    );
    cy.scrollTo(0, 0);
  });

  it("A post should be deleted", () => {
    cy.visit(URL);
    cy.get(".listItem:first-child .deleteButton").click();
    cy.get(".deleteConfirm").click();
    cy.contains(
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
    ).should("not.exist");
    cy.scrollTo(0, 0);
  });

  it("A post should be edited", () => {
    cy.visit(URL);
    cy.get(".listItem:first-child").contains(
      "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
    );
    cy.get(".listItem:first-child .editButton").click();
    cy.focused().clear().type("Hello cleverpy");
    cy.get(".editConfirm").click();
    cy.contains("Hello cleverpy");
    cy.get(".listItem:first-child")
      .contains(
        "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
      )
      .should("not.exist");
    cy.scrollTo(0, 0);
  });

  it("Logout and login", () => {
    cy.visit(URL);
    cy.contains("Logout").click();
    cy.url().should("include", "login");
    cy.get("#email").type("fake@email.com");
    cy.get("#email").should("have.value", "fake@email.com");
    cy.get("#password").type("123456");
    cy.get("#password").should("have.value", "123456");
    cy.get(".loginButton").click();
    cy.url().should("not.include", "login");
    cy.contains(
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
    );
  });
});
