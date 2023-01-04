describe('Blog ', function() {
	it('front page can be opened', function() {
		cy.visit('http://localhost:3000')
		cy.contains('blogs')
		//cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
	})
})

describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		cy.visit('http://localhost:3000')
		cy.contains('login').click()
	})

	it('Login form is shown', function() {
		cy.contains('Login')
		cy.contains('username')
	})

	describe('Login',function() {
		it('succeeds with correct credentials', function() {
			cy.get('#input-username').type('testuser')
			cy.get('#input-password').type('trustno1')
			cy.get('#button-login').click()
		})

		/*it('fails with wrong credentials', function() {
			// ...
		})*/
	})
})