describe('Blog ', function() {
	it('front page can be opened', function() {
		cy.visit('http://localhost:3000')
		cy.contains('blogs')
		//cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
	})
})

describe('Blog app', function() {
	const testUser = {
		username: 'cypress',
		realname: 'Cyp Ress',
		password: 'sypress123'
	}

	const testBlog = {
		title: 'Cypress Blog',
		url: 'www.cypressblog.com',
		author: testUser.realname
	}

	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		cy.request('POST', 'http://localhost:3003/api/users', testUser)
		
		cy.visit('http://localhost:3000')
		cy.contains('login').click()
	})

	const login = (uname, pwd) => {
		cy.get('#input-username').type(uname)
		cy.get('#input-password').type(pwd)
		cy.get('#button-login').click()
	}

	const createBlog = (title, author, url) => {
		cy.contains('create new blog').click()
		cy.get('#input-title').type(title)
		cy.get('#input-author').type(author)
		cy.get('#input-url').type(url)
		cy.get('#button-create').click()
	}

	it('Login form is shown', function() {
		cy.contains('Login')
		cy.contains('username')
	})

	describe('Login',function() {
		it('succeeds with correct credentials', function() {
			login(testUser.username, testUser.password)
			cy.contains(testUser.realname + ' logged in')
		})

		it('fails with wrong credentials', function() {
			login('nonexistinguser', 'wrongpassword')
			cy.contains('wrong credentials')
		})
	})

	describe.only('When logged in', function() {
		beforeEach(function() {
			login(testUser.username, testUser.password)
		})

		it('A blog can be created', function() {
			createBlog(testBlog.title, testBlog.author, testBlog.url)
			cy.contains(testBlog.title)
				.contains('view')
		})

		it('A blog can be liked', function() {
			createBlog(testBlog.title, testBlog.author, testBlog.url)
			cy.contains(testBlog.title)
				.contains('view').click()
			cy.contains(testBlog.title)
				.contains('Like').click()
		})

		it('A blog can be deleted by the user who created it', function() {
		})
	})
})