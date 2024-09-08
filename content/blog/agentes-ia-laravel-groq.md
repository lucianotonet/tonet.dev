---
title: "Agentes de IA com Laravel"
author: "Luciano Tonet"
date: "2024-08-30"
image: "ia-agents-laravel.webp"
thumbnail: "ia-agents-laravel-thumb.webp"
---

## Agentes de IA com Laravel

### Introdução

Seria possível desenvolvermos nossos próprios agentes de IA com Laravel?
Caso sim, quais seriam as vantagens e limitações?

Este artigo serve como um guia para a criação de seus próprios agentes de IA usando o Laravel, Groq e outras coisas.


### Desvendando o Mistério: Assistente vs. Agente de IA

Antes de qualquer coisa, é necessário esclarecer a diferença entre Assistentes e Agentes, no contexto de IA:

- **Assistentes de IA**: São basicamente os chatbots, como o ChatGPT, a Alexa ou Siri, que aguardam por solicitações do usuário para fornecer respostas e executar algumas ações simples.
- **Agentes de IA**: Esses são sistemas mais inteligentes que podem agir de forma autônoma para realizar tarefas, podem automatizar processos e tomar decisões sem dependem necessariamente do usuário.

### Mergulhando no Código: Implementando Agentes de IA com Laravel

Vamos dar vida a esses conceitos com exemplos práticos que demonstram a sinergia entre Laravel na construção de agentes de IA.

#### 1. Clima sob Demanda: Programando Tarefas para Verificações Diárias do Clima

Imagine acordar com uma previsão do tempo personalizada entregue diretamente na sua caixa de entrada - é o tipo de conveniência que um agente de IA pode fornecer. Vamos construir um trabalho que busca previsões meteorológicas diariamente e envia uma notificação informativa.

##### Criação do Trabalho

Aproveitando o Laravel, criaremos um trabalho que se conecta à Groq API para recuperar dados meteorológicos.

```bash
php artisan make:job CheckWeatherJob
```

```php
<?php
namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use LucianoTonet\GroqLaravel\Facades\Groq;
use Illuminate\Support\Facades\Notification;
use App\Notifications\WeatherForecast;

class CheckWeatherJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle()
    {
        $response = Groq::chat()->completions()->create([
            'model' => 'mixtral-8x7b-32768',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'Você é um assistente especializado em previsão do tempo.'
                ],
                [
                    'role' => 'user',
                    'content' => 'Qual é a previsão do tempo para amanhã em São Paulo?'
                ]
            ],
        ]);

        $forecast = $response['choices'][0]['message']['content'];

        Notification::route('mail', 'seu@email.com')
            ->notify(new WeatherForecast($forecast));
    }
}
```

##### Agendamento

O Laravel brilha com sua funcionalidade de agendamento. Vamos configurar nosso trabalho para ser executado diariamente, digamos, às 7h.

```php
// app/Console/Kernel.php
protected function schedule(Schedule $schedule)
{
    $schedule->job(new CheckWeatherJob())->dailyAt('07:00');
}
```

Este agente simples, mas poderoso, automatiza uma tarefa mundana e garante que você esteja sempre um passo à frente nas condições climáticas, sem qualquer esforço manual.

#### 2. Notificações Inteligentes: Alertas Automatizados Baseados em Condições

Vamos aumentar as apostas com um agente que monitora a temperatura de uma cidade e envia notificações quando um limite especificado é excedido. É personalização e proatividade em seu melhor.

##### Implementação

```php
<?php
namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use LucianoTonet\GroqLaravel\Facades\Groq;
use Illuminate\Support\Facades\Notification;
use App\Notifications\HighTemperatureAlert;

class MonitorTemperatureJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle()
    {
        $response = Groq::chat()->completions()->create([
            'model' => 'mixtral-8x7b-32768',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'Você é um assistente especializado em monitoramento de temperatura.'
                ],
                [
                    'role' => 'user',
                    'content' => 'Qual é a temperatura atual em São Paulo?'
                ]
            ],
        ]);

        $temperature = $this->extractTemperature($response['choices'][0]['message']['content']);

        if ($temperature > 30) {
            Notification::route('mail', 'seu@email.com')
                ->notify(new HighTemperatureAlert($temperature));
        }
    }

    private function extractTemperature($content)
    {
        // Lógica para extrair a temperatura do conteúdo
        // Retorna o valor numérico da temperatura
    }
}
```

##### Agendamento

Vamos instruir nosso agente a verificar a temperatura a cada hora, garantindo alertas oportunos.

```php
// app/Console/Kernel.php
protected function schedule(Schedule $schedule)
{
    $schedule->job(new MonitorTemperatureJob())->hourly();
}
```

Essa automação inteligente é inestimável para criar alertas personalizados, abrindo um novo reino de possibilidades para experiências inteligentes e proativas.

### Integrando os Conceitos de Agentes de IA de Andrew Ng

Andrew Ng, uma figura proeminente na IA, descreve os *fluxos agenticos* como uma evolução significativa na interação com a IA. Ele categoriza os agentes de IA em tipos como reflexivos, que revisam seu próprio trabalho, agentes que utilizam ferramentas externas, agentes de planejamento e agentes colaborativos. Esses tipos são fundamentais para entender como podemos aprimorar a funcionalidade dos agentes que estamos construindo com Laravel.

- **Reflexão**: Implementar um sistema onde o agente verifica e revisa suas próprias saídas pode ser feito através de um processo de feedback, onde o agente analisa o resultado de suas ações e ajusta seu comportamento.

- **Uso de Ferramentas**: A integração com APIs externas, como a Groq API, permite que os agentes realizem análises complexas e obtenham informações em tempo real, aumentando sua eficácia.

- **Planejamento**: Os agentes podem ser projetados para planejar suas ações com base em condições específicas, permitindo que eles realizem tarefas de forma mais autônoma e eficiente.

- **Colaboração Multi-Agente**: A implementação de sistemas onde múltiplos agentes colaboram pode ser explorada para tarefas mais complexas, como o desenvolvimento de software, onde diferentes agentes podem assumir papéis distintos (por exemplo, um agente para codificação, outro para revisão).

Esses conceitos não apenas ampliam a capacidade dos agentes de IA, mas também oferecem um framework robusto para a automação e a personalização de tarefas em aplicações reais.

### Abrace o Futuro da Automação com Agentes de IA

Neste artigo, embarcamos em uma jornada para o mundo dos agentes de IA, aproveitando o Laravel e a Groq API para criar soluções inteligentes. Ao implementar trabalhos agendados e notificações automatizadas, apenas arranhamos a superfície do que os agentes de IA podem alcançar. À medida que você se aprofunda neste domínio, descobrirá um potencial ilimitado para transformar ideias em soluções inteligentes, automatizando tarefas e recuperando tempo valioso. O futuro da automação chegou e está pronto para você moldar com o poder dos agentes de IA.

Citations:
- [1] https://nextbrain.ai/blog/andrew-ngs-vision-for-ais-future-unlocking-agentic-workflows
- [2] https://training.continuumlabs.ai/agents/what-is-agency/andrew-ngs-presentation-on-ai-agents
- [3] https://github.com/adrenallen/ai-agents-laravel
- [4] https://www.restack.io/p/ai-agent-workflow-answer-andrew-ng-cat-ai
- [5] https://cubettech.com/resources/blog/building-ai-powered-web-applications-with-laravel/
- [6] https://www.reddit.com/r/learnmachinelearning/comments/1c63sls/agentic_workflows_what_does_andrew_ng_think_of_ai/
- [7] https://mindwave.no
- [8] https://www.aifire.co/p/discover-the-power-of-ai-agents-simple-guide-to-building-your-own
- [9] https://github.com/HelgeSverre/mindwave