describe('GraphQL Bank Account API Test', () => {
    const apiUrl = 'http://localhost:3001/graphql';
    let cookieValue;
    it('should login and set the cookie', () => {
        const loginData = {
            type: "LOGIN",
            username: "nikolasarajlic",
            password: "Nikola85"
        };

        cy.request({
            method: 'POST',
            url: 'http://localhost:3001/login',
            body: loginData,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            const cookies = response.headers['set-cookie'];

            if (cookies) {
                cookies.forEach(cookie => {
                    const [cookieNameValue] = cookie.split(';');
                    const [name, value] = cookieNameValue.split('=');
                    if (name === 'connect.sid') {
                        cookieValue = value;
                        cy.setCookie(name, value);
                        expect(name).to.eq('connect.sid');
                        expect(value).to.be.a('string').and.not.be.empty;
                    }
                });
            }
        });

    });

    it('should fetch bank accounts and validate the response', () => {
        const query = `query ListBankAccount {
            listBankAccount {
                id
                uuid
                userId
                bankName
                accountNumber
                routingNumber
                isDeleted
                createdAt
                modifiedAt
            }
        }`;

        cy.request({
            method: 'POST',
            url: apiUrl,
            body: {
                operationName: 'ListBankAccount',
                query: query
            },
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:3000',
                'Referer': 'http://localhost:3000',
                'Accept-Language': 'en-US,en;q=0.9',
                'Cookie': `connect.sid=${cookieValue}`,
            },
        }).then((response) => {

            expect(response.status).to.eq(200);

            const bankAccounts = response.body.data.listBankAccount;
            const account = bankAccounts[0];

            expect(account).not.to.eq(null);

            expect(account.id).to.be.a('string').and.not.be.empty;;
            expect(account.uuid).to.be.a('string').and.not.be.empty;;
            expect(account.userId).to.be.a('string').and.not.be.empty;;
            expect(account.bankName).to.be.a('string').and.not.be.empty;;
            expect(account.accountNumber).to.be.a('string').and.not.be.empty;;
            expect(account.routingNumber).to.be.a('string').and.not.be.empty;;
            expect(account.isDeleted).to.be.a('boolean').and.to.be.false;
            expect(account.createdAt).to.be.a('string').and.not.be.empty;;
            expect(account.modifiedAt).to.be.a('string').and.not.be.empty;;


        });
    });
});
