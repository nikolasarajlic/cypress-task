describe('GraphQL Bank Account API Test', () => {
    const apiUrl = 'http://localhost:3001/graphql';

    it('should fetch bank accounts and validate the response', () => {
        const query = `
            query ListBankAccount {
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
            }
        `;


        cy.request({
            method: 'POST',
            url: apiUrl,
            body: {
                query: query
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            // Validate status code
            expect(response.status).to.eq(200);
            console.log(response);

            // Validate the response body structure and data
            const bankAccounts = response.body.data.listBankAccount;
            const account = bankAccounts[0]

                expect(account.id).to.eq(expectedAccount.id);
                expect(account.uuid).to.eq(expectedAccount.uuid);
                expect(account.userId).to.eq(expectedAccount.userId);
                expect(account.bankName).to.eq(expectedAccount.bankName);
                expect(account.accountNumber).to.eq(expectedAccount.accountNumber);
                expect(account.routingNumber).to.eq(expectedAccount.routingNumber);
                expect(account.isDeleted).to.eq(expectedAccount.isDeleted);
                expect(account.createdAt).to.eq(expectedAccount.createdAt);
                expect(account.modifiedAt).to.eq(expectedAccount.modifiedAt);
            });
        });
    });
