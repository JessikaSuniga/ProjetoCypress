import SignupFactory from '../factories/SignupFactory';
import SignupPage from '../pages/SignupPage';

// Describe define o contexto do teste, sobre o que é, ou o que é.
describe('Signup', () => {

    // it define o ponto a ser testado, o que deve ocorrer.
    it('User should be deliver', function () {

        // variavel da função
        var deliver = SignupFactory.deliver();

        // funções a executar
        SignupPage.go();
        SignupPage.fillForm(deliver);
        SignupPage.submit();

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        SignupPage.modalContentShouldBe(expectedMessage)
    })

    // Validação do documento incorreto
    it('Incorrect document', function () {

        var deliver = SignupFactory.deliver();

        deliver.cpf = '0000Aa000'

        SignupPage.go();
        SignupPage.fillForm(deliver);
        SignupPage.submit();
        SignupPage.alertMessageShouldBe('Oops! CPF inválido');
    })

    // Validação do email incorreto
    it('Incorrect email', function () {

        var deliver = SignupFactory.deliver();

        deliver.email = 'user.com.br';

        SignupPage.go();
        SignupPage.fillForm(deliver);
        SignupPage.submit();
        SignupPage.alertMessageShouldBe('Oops! Email com formato inválido.');
    })

    // Validação dos campos obrigatórios
    context('Required fields', function () {
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function () {
            SignupPage.go();
            SignupPage.submit();
        })

        messages.forEach(function (msg) {
            it(`${msg.field} is required`, function () {
                SignupPage.alertMessageShouldBe(msg.output);
            })
        })
    })

})
