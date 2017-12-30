'use strict';
(function () {
    var app = angular.module('sadApp');

    app.controller("NewFormController", function FormController(questionario,
                                                                ToastService,
                                                                DialogService,
                                                                $state,
                                                                $mdIcon) {

        let newformCtrl = this;

        newformCtrl.questionario = questionario.data.questoes;
        newformCtrl.token = $state.params.token;

        newformCtrl.inicializarComentarios = function() {
          let comentarios = []
          for(let i = 0; i < newformCtrl.questionario.length; i++) {
            comentarios.push('');
          }
          return comentarios;
        };

        newformCtrl.inicializarQuestaoRadio = function() {
          let questaoRadio = []
          for(let i = 0; i < newformCtrl.questionario.length; i++) {
           questaoRadio .push(null);
          }
          return questaoRadio ;
        };

        newformCtrl.questaoRadio = newformCtrl.inicializarQuestaoRadio();
        newformCtrl.comentarios = newformCtrl.inicializarComentarios();

        //newformCtrl.numeroDeQuestoesRespondidas = 0;
        newformCtrl.numeroDeQuestoes = newformCtrl.questionario.length;

        newformCtrl.home = true;

        newformCtrl.enviarResposta = function () {

            let titulo = 'Obrigado! Questionário Concluído.';
            let texto = 'Você respondeu todas as questões do formulário. Por favor, confirme o envio.';
            let ariaLabel = 'Lucky day';
            let confirmacao = 'Enviar Formulário';
            let cancelar = 'Cancelar Formulário';

            let promise = DialogService.confirmacao(titulo, texto, ariaLabel, confirmacao,
                                                    cancelar);

            promise.then(function() {
                // TODO: enviar respostas e deletar o token
            }, function() {});
        };

        newformCtrl.respostaRapida = function(resposta) {
          for (let i = 0; i < newformCtrl.questionario.length; i++) {
            if (newformCtrl.questionario[i].tipoQuestao === "ESCOLHA_SIMPLES") {
                newformCtrl.questaoRadio[i] = resposta;
            }
          }
          ToastService.criaToastComTema("Respostas alteradas pra " + resposta + ".",
                                        "orange-toast");
        };

        newformCtrl.dialogRespostaRapida = function() {
            let promise = DialogService.criaDialogRespostaRapida();

            promise.then(function(resposta) {
                newformCtrl.respostaRapida(resposta);
            }, function() {});
        };

        newformCtrl.marcarTodasQuestoes = function (value) {
            for (let i = 0; i < newformCtrl.numeroDeQuestoes; i++) {
                if(newformCtrl.questionario[i].tipoQuestao === "ESCOLHA_SIMPLES")
                  newformCtrl.questaoRadio[i] = value;
            }
        };

        newformCtrl.numeroDeQuestoesRespondidas = function () {
            let cont = 0;
            for (let i = 0; i < newformCtrl.numeroDeQuestoes; i++) {
                if(newformCtrl.questionario[i].tipoQuestao == "ESCOLHA_SIMPLES")
                  if(newformCtrl.questaoRadio[i]) cont += 1;
                if(newformCtrl.questionario[i].tipoQuestao == "TEXTO")
                  if(newformCtrl.comentarios[i].length > 0) cont += 1;
            }
            return cont;
        };

        newformCtrl.calcPorcentagem = function () {
            return newformCtrl.numeroDeQuestoesRespondidas() / (newformCtrl.numeroDeQuestoes) * 100;
        };

        newformCtrl.iniciar = function () {
            newformCtrl.home = false;
        };
  })
})();
