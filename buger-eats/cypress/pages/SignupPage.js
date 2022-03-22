
class SignupPage {

    // Função que realiza a visita, click do botão inicial e validação do texto.
    go() {
        cy.visit('/');

        cy.get('a[href="/deliver').click();
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas');
    }

    // Função que realiza o preenchimento dos campos
    fillForm(deliver) {
        cy.get('input[name="fullName"]').type(deliver.name);
        cy.get('input[name="cpf"]').type(deliver.cpf);
        cy.get('input[name="email"]').type(deliver.email);
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp);

        cy.get('input[name="postalcode"]').type(deliver.address.postalcode);
        cy.get('input[type=button][value="Buscar CEP"]').click();

        cy.get('input[name="address-number"]').type(deliver.address.number);
        cy.get('input[name="address-details"]').type(deliver.address.details);

        // Nesse caso ele está validando os valores submetidos após a busca pelo CEP que preenche automaticamente
        cy.get('input[name="address"]').should('have.value', deliver.address.street);
        cy.get('input[name="district"]').should('have.value', deliver.address.district);
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state);

        cy.contains('.delivery-method li', deliver.delivery_method).click();

        // Inserção da imagem, que está na pasta Fixtures/images
        cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh);
    }

    // Função de click no botão ao final do preenchimento
    submit() {
        cy.get('form button[type="submit"]').click();
    }

    // Validação da mensagem final, verifica se o texto é o esperado. 
    modalContentShouldBe(expectedMessage) {
        cy.get('.swal2-container .swal2-html-container')
            .should('have.text', expectedMessage);
    }

    // Validação das mensagem de erros
    alertMessageShouldBe(expectedMessage) {
        cy.contains('.alert-error', expectedMessage).should('be.visible');
    }

}

export default new SignupPage;

