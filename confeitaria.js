const prompt = require("prompt-sync")()
const fs = require("fs")
const path = require("path")

const produtos = []
const categorias = []
const precos = []
const fotos = []

function inclusao() {
    console.clear()
    console.log("\nInclusão de Produtos")
    console.log("=".repeat(40))

    const produto = prompt("Produto.....: ")
    const categoria = prompt("Categoria...: ")
    const preco = Number(prompt("Preço R$....: "))
    const foto = prompt("Foto........: ")

    produtos.push(produto)
    categorias.push(categoria)
    precos.push(preco)
    fotos.push(foto)

    console.log("\nOk! Produto Cadastrado com Sucesso")
}

function listagem() {
    console.clear()
    console.log("\nLista dos Produtos Cadastrados")
    console.log("=".repeat(40))

    console.log("\nNº Produto............: Categoria: Preço R$:")
    console.log("--------------------------------------------------")

    let contador = 0
    for (let i = 0; i < produtos.length; i++) {
        contador++
        const produto = produtos[i].padEnd(20)
        const categoria = categorias[i].padEnd(10)
        const preco = precos[i].toFixed(2).padStart(9)

        console.log(`${String(contador).padStart(2)} ${produto} ${categoria} ${preco}`)
    }
    console.log("--------------------------------------------------")
}

function pesquisa() {
    console.clear()
    console.log("\nPesquisa de Produtos por Categoria")
    console.log("=".repeat(40))

    const pesquisa = prompt("Informe a Categoria: ")

    console.log("\nProduto............: Preço R$:")
    console.log("----------------------------------------")

    let contador = 0

    for (let i = 0; i < produtos.length; i++) {
        if (pesquisa.toUpperCase() == categorias[i].toUpperCase()) {
            contador++
            const produto = produtos[i].padEnd(20)
            const preco = precos[i].toFixed(2).padStart(9)

            console.log(`${produto} ${preco}`)
        }
    }

    if (contador == 0) {
        console.log(`* Não há produtos da categoria: ${pesquisa}`)
    }

    console.log("----------------------------------------")
}

function paginaWeb() {
    console.clear()
    console.log("\nPágina Web dos Produtos Cadastrados")
    console.log("=".repeat(40))

    let conteudo = `
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cardápio: Confeitaria Doce Sabor</title>
    <style>
        body { font-family: Arial; margin: 20px; background-color: #fff0f5;}
        h1 { color: rgb(219, 112, 147)}
        table { width: 100%; border-collapse: collapse; background-color: #fff;
                box-shadow: 1px 1px 6px #999; border-radius: 8px; overflow: hidden;}
        th, td { padding: 12px; border-bottom: 1px solid #ccc;}
        th { background-color: #f8c8dc; color: #333; text-align: left;}
        img { max-width: 100px; max-height: 120px; border-radius: 4px; object-fit: cover;}
        tr:hover { background-color: #f9f9f9;}  
        .centro { text-align: center; }      
    </style>
</head>
<body>
    <h1>Confeitaria Doce Sabor: Cardápio Web</h1>
    <table>
        <thead>
            <tr>
                <th>Nome do Produto</th>
                <th>Categoria</th>
                <th>Preço R$</th>
                <th>Foto Ilustrativa</th>
            </tr>
        </thead>
        <tbody>      
    `

    for (let i = 0; i < produtos.length; i++) {
        const produto = produtos[i]
        const categoria = categorias[i]
        const preco = precos[i].toFixed(2)
        const foto = fotos[i]

        conteudo += `
          <tr><td>${produto}</td>
              <td>${categoria}</td>
              <td class="centro">${preco}</td>
              <td class="centro"><img src="${foto}" alt="Foto" onerror="this.onerror=null; this.src='https://via.placeholder.com/100?text=Sem+Foto';"></td></tr>
        `
    }

    conteudo += `
        </tbody>
    </table>
</body>
</html>
    `

    fs.writeFileSync("cardapio_confeitaria.html", conteudo)
    const caminhoAbsoluto = path.resolve("cardapio_confeitaria.html")
    const url = "file:///" + caminhoAbsoluto.replace(/\\/g, "/")

    console.log(`Acesse: ${url} para ver o cardápio`)
}

function resumo() {
    console.clear()
    console.log("\nResumo do Cadastro")
    console.log("=".repeat(40))

    console.log("------------------------------------------------------------------------")

    const numProdutos = produtos.length
    let soma = 0
    let bolos = 0
    let doces = 0

    for (let i = 0; i < produtos.length; i++) {
        soma += precos[i]
        if (categorias[i].toUpperCase() == "BOLOS" || categorias[i].toUpperCase() == "BOLO") {
            bolos++
        } else if (categorias[i].toUpperCase() == "DOCES" || categorias[i].toUpperCase() == "DOCE") {
            doces++
        }
    }

    const medio = numProdutos > 0 ? soma / numProdutos : 0
    const outros = numProdutos - bolos - doces

    console.log(`Nº Produtos Cadastrados: ${numProdutos}`)
    console.log(`R$ Médio: ${medio.toFixed(2)}`)

    console.log(`\nNº Bolos: ${bolos}`)
    console.log(`Nº Doces: ${doces}`)
    console.log(`Nº Outros: ${outros}`)

    console.log("------------------------------------------------------------------------")
}

function alteracao() {
    listagem()

    console.log("\nAlteração de Produtos")
    console.log("=".repeat(40))

    const num = Number(prompt("Informe o nº do Produto (0 => sair): "))

    if (num == 0 || num > produtos.length) {
        console.log("Nenhum produto alterado")
        return
    }

    const produto = produtos[num - 1]
    const categoria = categorias[num - 1]
    const preco = precos[num - 1]
    const foto = fotos[num - 1]

    console.log(`Produto.....: ${produto}`)
    console.log(`Categoria...: ${categoria}`)
    console.log(`Preço R$....: ${preco.toFixed(2)}`)
    console.log(`Foto........: ${foto}`)

    console.log("\nInforme os novos dados ou [Enter] para manter")

    const novoProduto = prompt("Produto.....: ") || produto
    const novaCategoria = prompt("Categoria...: ") || categoria
    const novoPreco = Number(prompt("Preço R$....: ")) || preco
    const novaFoto = prompt("Foto........: ") || foto

    produtos[num - 1] = novoProduto
    categorias[num - 1] = novaCategoria
    precos[num - 1] = novoPreco
    fotos[num - 1] = novaFoto

    console.log("\nOk! Produto alterado com sucesso")
}

function exclusao() {
    listagem()

    console.log("\nExclusão de Produtos")
    console.log("=".repeat(40))

    const num = Number(prompt("Informe o nº do Produto (0 => sair): "))

    if (num == 0 || num > produtos.length) {
        console.log("Nenhum produto excluído")
        return
    }

    const produto = produtos[num - 1]
    const categoria = categorias[num - 1]
    const preco = precos[num - 1]
    const foto = fotos[num - 1]

    console.log(`Produto.....: ${produto}`)
    console.log(`Categoria...: ${categoria}`)
    console.log(`Preço R$....: ${preco.toFixed(2)}`)
    console.log(`Foto........: ${foto}`)
    console.log()

    const confirma = prompt("Confirma a Exclusão (S/N): ")

    if (confirma.toUpperCase() == "S") {
        produtos.splice(num - 1, 1)
        categorias.splice(num - 1, 1)
        precos.splice(num - 1, 1)
        fotos.splice(num - 1, 1)

        console.log("\nOk! Produto excluído com sucesso")
    } else {
        console.log("\nOk! Produto NÃO foi excluído")
    }
}

function gravaDados() {
    const dados = []

    for (let i = 0; i < produtos.length; i++) {
        dados.push(
            produtos[i] + ";" +
            categorias[i] + ";" +
            precos[i] + ";" +
            fotos[i]
        )
    }

    fs.writeFileSync("produtos_confeitaria.txt", dados.join("\n"))

    console.log("\nOk! Dados salvos em arquivo")
}

function obtemDados() {
    if (fs.existsSync("produtos_confeitaria.txt")) {
        const linhas = fs.readFileSync("produtos_confeitaria.txt", "utf-8").split("\n")

        for (let i = 0; i < linhas.length; i++) {
            if (linhas[i].trim() === "") continue;
            const partes = linhas[i].split(";")

            produtos.push(partes[0].trim())
            categorias.push(partes[1].trim())
            precos.push(Number(partes[2]))
            fotos.push(partes[3].trim())
        }
    }
}

obtemDados()

menuPrincipal:
do {
    console.clear()
    console.log("\nConfeitaria Doce Sabor")
    console.log("=".repeat(40))
    console.log("1. Inclusão de Produtos")
    console.log("2. Listagem de Produtos Cadastrados")
    console.log("3. Pesquisa por Categoria")
    console.log("4. Cardápio Web")
    console.log("5. Estatística/Resumo")
    console.log("6. Alteração do Produto")
    console.log("7. Exclusão de Produto")
    console.log("8. Finalizar")
    const opcao = Number(prompt("Opção: "))

    switch (opcao) {
        case 1: {
            inclusao()
            break
        }
        case 2: {
            listagem()
            break
        }
        case 3: {
            pesquisa()
            break
        }
        case 4: {
            paginaWeb()
            break
        }
        case 5: {
            resumo()
            break
        }
        case 6: {
            alteracao()
            break
        }
        case 7: {
            exclusao()
            break
        }
        default: {
            break menuPrincipal
        }
    }
    prompt("\nPressione [Enter] para continuar...")
} while (true)

gravaDados()

console.log("\nFim do Programa...")
