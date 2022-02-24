describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    const user = {
      username: 'kayttaja2',
      name: 'Kayttaja2',
      password: 'salasana2'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('User can login and create a new blog', function() {
    it('User with wrong credential cannot login', function() {
      cy.get('input:first').type('kayttaja2')
      cy.get('input:last').type('sala2')
      cy.contains('login').click()
      cy.contains('wrong username or password')
    })

    it('User with right credential can login', function() {
      cy.get('input:first').type('kayttaja2')
      cy.get('input:last').type('salasana2')
      cy.contains('login').click()
      cy.contains('kayttaja2 logged in')
    })
  })

  describe('When logged in', function() {

    beforeEach(function() {
      cy.get('input:first').type('kayttaja2')
      cy.get('input:last').type('salasana2')
      cy.contains('login').click()
      cy.contains('new blog').click()
      cy.get('#title').type('blog1')
      cy.get('#author').type('author1')
      cy.get('#url').type('url1')
      cy.get('#create').click()
    })

    it('User can create a new blog entry', function() {
      cy.contains('a new blog blog1 by author1 added')
    })

    it('A blog entry can be liked', function() {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('A blog entry can be removed', function() {
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.contains('view').should('not.exist')
    })

  })

})