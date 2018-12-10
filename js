
$(document).ready(function () {
    $(function () {
        $("#tabs").tabs();
    });

    $("#btLimpar").click(function () {
        localStorage.setItem("id", "56");
        limpar();

    });

    $("#btSalvar").click(function () {

        var nome = $.trim($("#nome").val());
        if (nome == "") {
            exibirMensagemErro("Informe o nome");
            return false;
        }

        if (nome.length <= 10) {
            exibirMensagemErro("Informe o nome com mais de 10 caracteres");
            return false;
        }

        var cpf = $.trim($("#cpf").val());
        if (cpf == "") {
            exibirMensagemErro("Informe o CPF");
            return false;
        }

        if (cpf.length != 11) {
            exibirMensagemErro("Informe o CPF com 11 numeros");
            return false;
        }

        var sexo = $("input[name=sexo]:checked").val();
        if (sexo == undefined) {
            exibirMensagemErro("Informe o sexo");
            return false;
        }

        var cidade = $.trim($("#cidade").val());

        if (sexo == "M") {
            sexo = "Masculino";
        } else {
            sexo = "Feminino";
        }


        var ativo = "Não";
        if ($("#ativo").prop("checked")) {
            ativo = "Sim";
        }

        var gravidez = "Não";
        if ($("#gravidez").prop("checked")) {
            gravidez = "Sim";
        }

        descricao = $("#descricao").val();

        var id = $("#id").val();
        if (id == "") {
            id = new Date().getTime();
        }

        var objeto = new Object();
        objeto.id = id;
        objeto.nome = nome;
        objeto.sexo = sexo;
        objeto.cpf = cpf;
        objeto.cidade = cidade;
        objeto.gravidez = gravidez;
        objeto.ativo = ativo;
        objeto.descricao = $("#descricao").val();

        var objeto = JSON.stringify(objeto);
        localStorage.setItem(id, objeto);


        $.post("https://demo3999807.mockable.io/contato ", function (data) {
            alert(data);
        });
        incluirLinha(id, objeto);
        limpar();
    });


    $("input[name=sexo]").click(function () {
        $("#gravidez").hide();
        $("#gravida").prop("checked", false);
        if ($(this).val() == "F") {
            $("#gravidez").show();
        }
    });

    $("#tbody_contatos").on("click", ".exclusao", function () {
        $(this).closest("tr").remove();

        localStorage.removeItem($(this).closest("tr").prop("id"));
    });


    $("#tbody_contatos").on("click", ".alteracao", function () {
        objeto = localStorage.getItem($(this).closest("tr").prop("id"));
        alert(objeto);
        objeto = JSON.parse(objeto);

        $("#id").val(objeto.id);
        $("#nome").val(objeto.nome);
        $("#cidade").val(objeto.cidade);
        $("#cpf").val(objeto.cpf);
        $("#gravidez").val(objeto.gravidez);
        $("#descricao").val(objeto.descricao);

        if (objeto.sexo == "Masculino") {

            $("#sexoM").prop("checked", true);
            $("#gravidez").hide();
        } else {
            $("#sexoF").prop("checked", true);
            $("#gravidez").show();
            $("#gravida").prop("checked", objeto.gravidez);

        }

        $("#ativo").prop("checked", objeto.ativo);
    });


    carregaCidades();
    carregarDados();
});

function exibirMensagemErro(mensagem) {
    $("#mensagem").css("color", "red");
    $("#mensagem").html("<h4>" + mensagem + "</h4>");
    $("#dialog").dialog();
    
}

function exibirMensagemOk(mensagem) {
    $("#mensagem").css("color", "green");
    $("#mensagem").html("<h4>" + mensagem + "</h4>");
    $("#dialog").dialog();
}

function limpar() {
    $("#id").val("");
    $("#nome").val("");
    $("#cidade").val("");
    $("#cpf").val("");
    $("#descricao").val("");
    $("#arquivo").val("");
    $("#gravidez").hide();
    $("#mensagem").html("");
    $("#ativo").prop("checked", false);
    $("input[name=sexo]").prop("checked", false);
}

function incluirLinha(id, objeto) {
    $("#" + id).remove();
    objeto = JSON.parse(objeto);

    var tr = "<tr" + ' id=' + id + ">";
    tr += "<td>" + objeto.nome + "</td>";
    tr += "<td>" + objeto.sexo + "</td>";
    tr += "<td>" + objeto.cidade + "</td>";
    tr += "<td>" + objeto.cpf + "</td>";
    tr += "<td>" + objeto.ativo + "</td>";
    tr += "<td>" + objeto.gravidez + "</td>";
    tr += "<td>" + objeto.descricao + "</td>";
    tr += "<td><a class='alteracao' href='Javascript:void(0)'>Alt</a> | <a class='exclusao' href='Javascript:void(0)'>EX</a> </td>";
    tr += "</tr>";


    $("#tbody_contatos").append(tr);

}

function carregarDados() {
    var keys = Object.keys(localStorage);

    for (var i = 0; i < keys.length; i++) {
        console.log(keys[i]);

        objeto = localStorage.getItem(keys[i]);
        incluirLinha(keys[i], objeto);
    }
}

function carregaCidades() {

    $.getJSON("https://demo3999807.mockable.io/cidades", function (result) {
        for (let i = 0; i < result.length; i++) {

            $("#cidade").append("<option value='" + result[i] + "'>" + result[i] + "</option>");

        }
    })
}







/* 
//Código do professor:


$(document).ready(function(){

	$("#btLimpar").click(function(){
		limpar();
	});

	$("#btSalvar").click(function(){
		var nome = $.trim($("#nome").val());
		if (nome == "") {
			exibirMensagemErro("Informe o nome");
			return false;
		}

		if (nome.length <= 10) {
			exibirMensagemErro("Informe o nome com mais de 10 caracteres");
			return false;
		}

		var cpf = $.trim($("#cpf").val());
		if (cpf == "") {
			exibirMensagemErro("Informe o CPF");
			return false;
		}

		if (cpf.length != 11) {
			exibirMensagemErro("Informe o CPF com 11 numeros");
			return false;
		}

		var sexo = $("input[name=sexo]:checked").val();
		if (sexo == undefined) {
			exibirMensagemErro("Informe o sexo");
			return false;
		}

		var cidade = $.trim($("#cidade").val());

		if (sexo == "M") {
			sexo = "Masculino";
		} else {
			sexo = "Feminino";
		}

		var ativo = "Não";
		if ($("#ativo").prop("checked")){
			ativo = "Sim"
		}

		var objeto = new Object();
		objeto.nome = nome;
		objeto.sexo = sexo;
		objeto.cidade = cidade;
		objeto.cpf = cpf;
		objeto.ativo = $("#ativo").prop("checked");
		objeto.gravida = $("#gravida").prop("checked");
		objeto.descricao = $("#descricao").val();

		var objeto = JSON.stringify(objeto);
		localStorage.setItem("objeto", objeto);

		var tr = "<tr>";
		tr += "<td>" + nome + "</td>";
		tr += "<td>" + sexo + "</td>";
		tr += "<td>" + cidade + "</td>";
		tr += "<td>" + cpf + "</td>";
		tr += "<td>" + ativo + "</td>";
		tr += "<td><a class='alteracao' href="" +
			"Alt</a> | <a class='exclusao' href="" + 
			"Exc</a></td>";
		tr += "</tr>";

		$("#tbody_contatos").append(tr);
		exibirMensagemOk("Sucesso!");
		limpar();
	});

	$("input[name=sexo]").click(function(){
		$("#gravidez").hide();
		$("#gravida").prop("checked", false);
		if ($(this).val() == "F"){
			$("#gravidez").show();
		}
	});

	$(".exclusao").click(function(){
		$(this).closest("tr").remove();
	});

	$(".alteracao").click(function(){
		objeto = localStorage.getItem("objeto");	
		objeto = JSON.parse(objeto);	
		

		$("#nome").val(objeto.nome);
		$("#cidade").val(objeto.cidade);
		$("#cpf").val(objeto.cpf);
		$("#descricao").val(objeto.descricao);

		if (objeto.sexo == "Masculino"){
			$("#sexoM").prop("checked", true);
			$("#gravidez").hide();	
		} else {
			$("#sexoF").prop("checked", true);	
			$("#gravidez").show();
			$("#gravida").prop("checked", objeto.gravida);	
		}

		$("#ativo").prop("checked", objeto.ativo);

	});


});

function exibirMensagemErro(mensagem){
	$("#mensagem").css("color", "red");
	$("#mensagem").html("<h4>" + mensagem + "</h4>");
}	

function exibirMensagemOk(mensagem){
	$("#mensagem").css("color", "green");
	$("#mensagem").html("<h4>" + mensagem + "</h4>");
}

function limpar(){
	$("#nome").val("");
	$("#cidade").val("");
	$("#cpf").val("");
	$("#descricao").val("");
	$("#arquivo").val("");
	$("#gravidez").hide();
	$("#mensagem").html("");
	$("#ativo").prop("checked", false);
	$("input[name=sexo]").prop("checked", false);
}

*/
