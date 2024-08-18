<template>
    <div class="max-w-3xl mx-auto p-6 pt-24">
        <h1 class="text-5xl font-bold mb-4">Blazing Fast AI Inference with PHP - Part 1: Introduction</h1>
        <p class="opacity-50 mb-2">By Luciano Tonet on 30/07/2024</p>
        <article class="prose dark:prose-invert lg:prose-xl">
            <p>Welcome to our series "Blazing Fast AI Inference with PHP"! In this first article, we will explore how
                PHP can be a powerful tool for performing AI inferences using the innovative Groq API.</p>

            <h2 class="text-2xl font-semibold mt-4">Why PHP for AI?</h2>
            <p>You might be wondering: "PHP for AI? Wouldn't it be more common to use Python or other data
                science-oriented languages?". It's true, PHP is not the usual choice for AI tasks. However, with the
                advent of accessible and efficient APIs like Groq, this reality is changing. PHP, traditionally used for
                web development, can now be leveraged to integrate AI solutions into web applications, making it a
                viable option for developers already familiar with the language.</p>

            <h2 class="text-2xl font-semibold mt-4">What is the Groq API?</h2>
            <p>The Groq API is a platform that allows for fast and efficient AI inferences. With it, you can integrate
                AI functionalities into your PHP projects without complications. The Groq PHP library simplifies access
                to this API, allowing you to utilize its resources directly and effectively. Groq oferece uma variedade
                de modelos de linguagem que podem ser usados para diferentes tarefas, como geração de texto, tradução e
                mais.</p>

            <h2 class="text-2xl font-semibold mt-4">Setting Up the Groq PHP Library</h2>
            <p>To get started, you will need to install the Groq library in your PHP project. The official documentation
                provides detailed guidance on how to do this. Once installed, you will be able to perform tasks such as
                text generation and data classification with ease.</p>

            <h3 class="text-xl font-semibold mt-4">Installation Example</h3>
            <p>You can install the Groq library using Composer. Run the following command in your terminal:</p>
            <pre class="language-bash"><code class="language-bash">composer require lucianotonet/groq-php</code></pre>
            <p>After installation, you can start using the library in your PHP code:</p>
            <pre class="language-php"><code class="language-php">require 'vendor/autoload.php';

use LucianoTonet\GroqPHP\Groq;

$groq = new Groq(['api_key' => 'YOUR_API_KEY_HERE']);

$response = $groq->chat()->completions()->create([
    'model' => 'mixtral-8x7b-32768',
    'messages' => [
        [
            'role' => 'user',
            'content' => 'Explain the importance of low latency language models.',
        ],
    ],
]);

echo $response['choices'][0]['message']['content'];
</code></pre>

            <h3 class="text-xl font-semibold mt-4">Error Handling Example</h3>
            <p>When working with the Groq API, it's important to handle potential errors. Here’s how you can implement
                error handling:</p>
            <pre class="language-php"><code class="language-php">use LucianoTonet\GroqPHP\GroqException;

try {
    $response = $groq->chat()->completions()->create([
        'model' => 'mixtral-8x7b-32768',
        'messages' => [
            [
                'role' => 'user',
                'content' => 'Hello, world!'
            ]
        ]
    ]);
} catch (GroqException $err) {
    echo "&lt;strong&gt;Error code:&lt;/strong&gt; " . $err->getCode() . "&lt;br&gt;";
    echo "&lt;strong&gt;Message:&lt;/strong&gt; " . $err->getMessage() . "&lt;br&gt;";
    echo "&lt;strong&gt;Type:&lt;/strong&gt; " . $err->getType() . "&lt;br&gt;";
    echo "&lt;strong&gt;Headers:&lt;/strong&gt;&lt;br&gt;"; 
    print_r($err->getHeaders());
}</code></pre>

            <h2 class="text-2xl font-semibold mt-4">Conclusion</h2>
            <p>Stay tuned for the upcoming parts of this exciting series! If you're eager to start exploring AI with
                PHP, be sure to check out the Groq PHP library at <a href="https://github.com/lucianotonet/groq-php"
                    class="text-blue-500 underline">https://github.com/lucianotonet/groq-php</a>. It facilitates access
                to the powerful Groq API directly in your PHP projects.</p>
            <p>Until next time! Let's put PHP at the center of AI innovation together.</p>
        </article>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'blog-post'
});
</script>
