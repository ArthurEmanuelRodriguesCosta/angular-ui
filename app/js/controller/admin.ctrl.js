'use strict';
(function () {
	var app = angular.module('sadApp');

	app.controller("AdminController", function MainController($state) {

		var adminCtrl = this;
		adminCtrl.ufcgBrasao = "./view/img/brasaoUfcg.png";
		adminCtrl.ccBrasao = "./view/img/dsc.png";
		const STATE_HOME = "sad-admin.home";

		adminCtrl.goTo = function goTo(state) {
			$state.go(state);
		};

		adminCtrl.pages = [
			{
				icon: 'library_add',
				title: 'Cadastrar Turmas',
				state: 'sad-admin.cadastra-turmas'
			}
		];

		adminCtrl.goTo = (state) => {
			console.log(state);
			$state.go(state);
		}

		adminCtrl.goToHome = () => {
			$state.go(STATE_HOME);
		}

	});
})();