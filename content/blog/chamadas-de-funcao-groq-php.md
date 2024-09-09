---
title: "Dominando Chamadas de Função com Groq-PHP"
author: "Seu Nome"
date: "2024-09-06"
image: "groq-function-calls.png" 
thumbnail: "groq-function-calls-thumb.png" 
---

## Dominando Chamadas de Função com Groq-PHP

As chamadas de função no Groq-PHP oferecem uma maneira poderosa de estender a funcionalidade básica do Groq, permitindo que você execute código personalizado e interaja com serviços externos diretamente de suas consultas. Este guia detalhado irá guiá-lo por tudo o que você precisa saber sobre chamadas de função no Groq-PHP, desde os fundamentos até exemplos do mundo real.

### O que são Chamadas de Função?

Em essência, as chamadas de função permitem que você execute código fora do escopo da linguagem de consulta Groq. Isso é particularmente útil quando você precisa:

- Buscar dados de APIs externas.
- Executar cálculos complexos ou lógica de negócios.
- Integrar com serviços de terceiros.

### Anatomia de uma Chamada de Função Groq-PHP

No Groq-PHP, uma chamada de função é definida como uma ferramenta (tool) que pode ser utilizada pelo modelo de linguagem. Vamos explorar a estrutura básica:

```php
$tools = [
    [
        "type" => "function",
        "function" => [
            "name" => "nome_da_funcao",
            "description" => "Descrição do que a função faz",
            "parameters" => [
                "type" => "object",
                "properties" => [
                    "parametro1" => [
                        "type" => "string",
                        "description" => "Descrição do parâmetro 1"
                    ],
                    // Outros parâmetros...
                ],
                "required" => ["parametro1"],
                "default" => ["parametro1" => "valor_padrao"]
            ],
        ]
    ],
    // Outras funções...
];
```

### Exemplos Práticos de Chamadas de Função

Vamos explorar alguns exemplos práticos de como usar chamadas de função no Groq-PHP:

#### 1. Obter Informações de Clima

Suponha que você queira integrar informações de clima em sua aplicação. Você pode criar uma função que busca dados meteorológicos de uma API externa:

```php
function getCurrentWeatherTool(array $parameters = []): string {
    $location = $parameters['location'] ?? 'New York';
    // Aqui você faria uma chamada real para uma API de clima
    return '30°C, ensolarado em ' . $location;
}

$tools = [
    [
        "type" => "function",
        "function" => [
            "name" => "getCurrentWeatherTool",
            "description" => "Obter o clima atual em uma localização específica.",
            "parameters" => [
                "type" => "object",
                "properties" => [
                    "location" => [
                        "type" => "string",
                        "description" => "Localização para obter o clima."
                    ],
                ],
                "required" => ["location"],
                "default" => ["location" => "New York"]
            ],
        ]
    ]
];

// Uso da função
$response = $groq->chat()->completions()->create([
    'model' => 'llama3-groq-70b-8192-tool-use-preview',
    'messages' => [
        ['role' => 'user', 'content' => 'Como está o clima em Londres?']
    ],
    "tool_choice" => "auto",
    "tools" => $tools
]);
```

#### 2. Obter Placar de Jogos da NBA

Outro exemplo prático seria obter o placar de jogos da NBA:

```php
function getNbaScore($teamName) {
    // Simulação de dados de placar
    if (strpos(strtolower($teamName), 'warriors') !== false) {
        return json_encode([
            "game_id" => "401585601",
            "status" => 'Final',
            "home_team" => "Los Angeles Lakers",
            "home_team_score" => 121,
            "away_team" => "Golden State Warriors",
            "away_team_score" => 128
        ]);
    }
    // ... outras condições para diferentes times
}

$tools = [
    [
        'type' => 'function',
        'function' => [
            'name' => 'getNbaScore',
            'description' => 'Obter o placar de um jogo da NBA',
            'parameters' => [
                'type' => 'object',
                'properties' => [
                    "team_name" => [
                        "type" => "string",
                        "description" => "O nome do time da NBA (ex: 'Golden State Warriors')",
                    ]
                ],
                "required" => ["team_name"],
            ],
        ],
    ]
];

// Uso da função
$response = $groq->chat()->completions()->create([
    'model' => 'llama3-groq-70b-8192-tool-use-preview',
    'messages' => [
        ['role' => 'user', 'content' => 'Qual foi o placar do último jogo dos Warriors?']
    ],
    "tool_choice" => "auto",
    "tools" => $tools
]);
```

### Processando a Resposta

Após chamar uma função, você precisa processar a resposta e incorporá-la à conversa. Aqui está um exemplo de como fazer isso:

```php
if (isset($response['choices'][0]['message']['tool_calls'])) {
    foreach ($response['choices'][0]['message']['tool_calls'] as $tool_call) {
        $function_args = json_decode($tool_call['function']['arguments'], true);
        $function_response = $tool_call['function']['name']($function_args);
        
        $messages[] = [
            'tool_call_id' => $tool_call['id'],
            'role' => 'tool',
            'name' => $tool_call['function']['name'],
            'content' => $function_response,
        ];
    }
    
    // Construir resposta final
    $final_response = $groq->chat()->completions()->create([
        'model' => 'mixtral-8x7b-32768',
        'messages' => $messages
    ]);
    
    echo $final_response['choices'][0]['message']['content'];
}
```

### Conclusão

As chamadas de função no Groq-PHP abrem um mundo de possibilidades para enriquecer suas aplicações com dados externos e lógica personalizada. Ao dominar esta técnica, você pode criar interações mais ricas e contextuais com o modelo de linguagem, resultando em aplicações mais poderosas e úteis.

Lembre-se de sempre tratar os erros adequadamente e considerar as implicações de desempenho ao fazer chamadas externas. Com prática e experimentação, você será capaz de criar integrações sofisticadas que aproveitam ao máximo o poder do Groq-PHP.
