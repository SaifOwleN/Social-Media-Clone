describe("template spec", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users", {
      name: "root",
      username: "root",
      password: "password",
    });
    cy.visit("");
  });
  it("login form", () => {
    cy.contains("login");
  });

  describe("login", () => {
    it("login succeeded", () => {
      cy.get("input:first").type("root");
      cy.get("input:last").type("password");
      cy.contains("login").click();
      cy.contains("add blog");
    });

    it("login failed", () => {
      cy.get("input:first").type("root");
      cy.get("input:last").type("root");
      cy.contains("login").click();
      cy.contains("Wrong username or password");
    });
  });

  describe("while logged in", () => {
    beforeEach(() => {
      cy.get("input:first").type("root");
      cy.get("input:last").type("password");
      cy.contains("login").click();
    });

    it("add blog", () => {
      cy.contains("add blog").click();
      cy.get("input.title").type("rodadsdasadsdsdsaasdot");
      cy.get("input.author").type("adsasddsa");
      cy.get("input.url").type("www.dsdsadsadas.com");
      cy.get(".Create").contains("Create").click();
      cy.contains("rodadsdasadsdsdsaasdot");
    });
    describe("while there is blogs", () => {
      beforeEach(() => {
        cy.contains("add blog").click();
        cy.get("input.title").type("rodadsdasadsdsdsaasdot");
        cy.get("input.author").type("adsasddsa");
        cy.get("input.url").type("www.dsdsadsadas.com");
        cy.get(".Create").contains("Create").click();
        cy.get("input.title").type("2nd blog");
        cy.get("input.author").type("xddMOTS");
        cy.get("input.url").type("www.xddMOTS.com");
        cy.get(".Create").contains("Create").click();
      });

      it("like a blog", () => {
        cy.contains("show").click();
        cy.contains("0");
        cy.contains("like").click();
        cy.contains("1");
      });

      it("delete button", () => {
        cy.contains("show").click();
        cy.contains("delete").click();
        cy.get("html").should("not.contain", "rodadsdasadsdsdsaasdot");
      });

      describe("while there is blogs", () => {
        beforeEach(() => {
          cy.get(".blog").eq(1).contains("show").click();
          cy.get(".blog").eq(1).contains("like").click();
          cy.visit("");
        });

        it("test to sort likes", () => {
          cy.get(".blog").eq(0).should("contain", "xddMOTS");
        });
      });
    });
  });
});
