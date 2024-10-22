describe('GraphQL API Test - Bank Accounts', () => {
    it('Should fetch and validate bank account information', () => {
        
        const query = `
            query {
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
            url: 'http://localhost:3001/graphql',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: {
                query: query
            }
        }).then((response) => {
            
            expect(response.status).to.eq(200);

            
            const firstAccount = response.body?.data?.listBankAccount?.[0];
            
            
            if (firstAccount) {
                expect(firstAccount).to.have.property('id').that.equals('-8GYeBh5a');
                expect(firstAccount).to.have.property('uuid').that.equals('e4c63622-d988-48fb-9216-79ac6eff8ae6');
                expect(firstAccount).to.have.property('userId').that.equals('OJQxZl9KA');
                expect(firstAccount).to.have.property('bankName').that.equals('Banka');
                expect(firstAccount).to.have.property('accountNumber').that.equals('123456789');
                expect(firstAccount).to.have.property('routingNumber').that.equals('987654321');
                expect(firstAccount).to.have.property('isDeleted').that.equals(false);
              
            } 
        });
    });
});