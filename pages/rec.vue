<style>
.glass-effect {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.dark-panel {
    background: v-bind("isDarkMode ? 'linear-gradient(145deg, #1a1a1a, #2d2d2d)' : 'linear-gradient(145deg, #ffffff, #f5f5f5)'");
    border: v-bind("isDarkMode ? '1px solid #3a3a3a' : '1px solid #e5e5e5'");
}

.recording-pulse {
    animation: pulse-red 1.5s infinite;
}

@keyframes pulse-red {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}

.preview-container {
    aspect-ratio: 16/9;
    background: #000;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
}

.preview-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, #667eea, #764ba2);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.8;
}

.floating-timer {
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px 20px;
    border-radius: 25px;
    font-family: 'Courier New', monospace;
    font-size: 1.2rem;
    z-index: 1000;
    display: none;
    border: 2px solid #ef4444;
}

.status-indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 8px;
}

.status-ready {
    background-color: #10b981;
}

.status-recording {
    background-color: #ef4444;
}

.status-paused {
    background-color: #f59e0b;
}

.status-stopped {
    background-color: #6b7280;
}

.control-button {
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.control-button:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transition: width 0.6s, height 0.6s, top 0.6s, left 0.6s;
}

.control-button:active:before {
    width: 300px;
    height: 300px;
    top: -150px;
    left: -150px;
}

.waveform {
    height: 4px;
    background: #374151;
    border-radius: 2px;
    overflow: hidden;
    position: relative;
}

.waveform-active {
    height: 100%;
    background: linear-gradient(90deg, #10b981, #06d6a0);
    width: 0%;
    transition: width 0.1s ease;
}

.recording-list {
    max-height: 250px;
    overflow-y: auto;
}

.min-h-0 {
    min-height: 0;
}

.aspect-video {
    aspect-ratio: 16 / 9;
}



.webcam-preview {
    border-radius: 8px;
    background: #000;
    position: relative;
    overflow: hidden;
}

.recording-list {
    max-height: none;
}

.recording-item {
    transition: all 0.3s ease;
    background: v-bind("isDarkMode ? '#1f2937' : '#f3f4f6'");
}

.recording-item:hover {
    transform: translateY(-1px);
    box-shadow: v-bind("isDarkMode ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)'");
    background: v-bind("isDarkMode ? '#374151' : '#ffffff'");
}

@media (max-width: 1024px) {
    .min-h-screen {
        padding: 16px 12px;
    }
}

@media (max-width: 1280px) {
    .xl\:grid-cols-5 {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }

    .xl\:col-span-1,
    .xl\:col-span-3 {
        grid-column: span 1 / span 1;
    }
}

@media (max-width: 768px) {
    .floating-timer {
        top: 10px;
        right: 10px;
        font-size: 1rem;
        padding: 8px 16px;
    }

    .min-h-screen {
        padding: 12px 8px;
    }

    .gap-4 {
        gap: 12px;
    }

    .text-2xl {
        font-size: 1.25rem;
    }
}

select {
    background-color: v-bind("isDarkMode ? '#374151' : '#f3f4f6'");
    color: v-bind("isDarkMode ? '#ffffff' : '#1f2937'");
    border-color: v-bind("isDarkMode ? '#4b5563' : '#d1d5db'");
}

select:hover {
    background-color: v-bind("isDarkMode ? '#4b5563' : '#ffffff'");
    border-color: v-bind("isDarkMode ? '#6b7280' : '#9ca3af'");
}
</style>

<template>
    <div :class="[
        'min-h-screen',
        isDarkMode ? 'text-white' : 'text-gray-900',
        isDarkMode ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 'bg-gradient-to-br from-slate-200 via-purple-200 to-slate-200'
    ]">
        <!-- Timer Flutuante -->
        <div ref="floatingTimer" class="floating-timer z-50">
            <span class="status-indicator recording-pulse status-recording"></span>
            <span ref="timerDisplay">00:00:00</span>
            <span class="ml-2 text-sm">REC</span>
        </div>

        <div class="min-h-screen p-4 flex flex-col gap-4">
            <!-- Header com título e status -->
            <header class="dark-panel rounded-lg p-4">
                <div class="flex items-center justify-between">
                    <h1 class="text-2xl font-bold">REC - Screen Recorder</h1>
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center">
                            <span :class="statusIndicatorClass"></span>
                            <span ref="statusText" class="text-sm" :class="isDarkMode ? 'text-gray-300' : 'text-gray-600'">{{ statusMessage }}</span>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Layout principal -->
            <div class="flex-1 grid grid-cols-1 xl:grid-cols-5 gap-4 min-h-0">

                <!-- Painel Lateral Esquerdo -->
                <div class="xl:col-span-1 flex flex-col gap-4 min-h-0">

                    <!-- Fontes de Captura -->
                    <div class="dark-panel rounded-lg p-4 flex-shrink-0">
                        <h3 class="text-lg font-semibold mb-3">Fontes de Captura</h3>

                        <div class="space-y-2">
                            <label
                                class="flex items-center space-x-3 p-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-500 cursor-pointer transition-colors">
                                <input type="checkbox" ref="captureScreen" class="w-4 h-4 text-blue-600 rounded">
                                <svg class="w-4 h-4" :class="isDarkMode ? 'text-blue-400' : 'text-blue-600'" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                </svg>
                                <span class="text-sm">Capturar Tela</span>
                            </label>

                            <label
                                class="flex items-center space-x-3 p-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-500 cursor-pointer transition-colors">
                                <input type="checkbox" ref="captureWebcam" class="w-4 h-4 text-green-600 rounded">
                                <svg class="w-4 h-4" :class="isDarkMode ? 'text-green-400' : 'text-green-600'" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                </svg>
                                <span class="text-sm">Webcam</span>
                            </label>

                            <label
                                class="flex items-center space-x-3 p-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-500 cursor-pointer transition-colors">
                                <input type="checkbox" ref="captureMicrophone" class="w-4 h-4 text-red-600 rounded">
                                <svg class="w-4 h-4" :class="isDarkMode ? 'text-red-400' : 'text-red-600'" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4z" />
                                    <path
                                        d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5H10.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z" />
                                </svg>
                                <span class="text-sm">Microfone</span>
                            </label>

                            <label
                                class="flex items-center space-x-3 p-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-500 cursor-pointer transition-colors">
                                <input type="checkbox" ref="captureSystemAudio" class="w-4 h-4 text-purple-600 rounded">
                                <svg class="w-4 h-4" :class="isDarkMode ? 'text-purple-400' : 'text-purple-600'" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fill-rule="evenodd"
                                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <span class="text-sm">Áudio do Sistema</span>
                            </label>
                        </div>
                    </div>

                    <!-- Preview da Webcam -->
                    <div class="dark-panel rounded-lg p-4 flex-shrink-0">
                        <h3 class="text-lg font-semibold mb-3">Preview Webcam</h3>
                        <div class="webcam-preview w-full aspect-video">
                            <video ref="webcamPreview" class="w-full h-full object-cover rounded" autoplay muted></video>
                        </div>
                    </div>

                    <!-- Configurações -->
                    <div class="dark-panel rounded-lg p-4 flex-shrink-0">
                        <h3 class="text-lg font-semibold mb-3">Configurações</h3>

                        <div class="space-y-3">
                            <div>
                                <label class="block text-sm text-gray-300 mb-1">Resolução</label>
                                <select ref="qualitySelect"
                                    class="w-full bg-gray-700 text-white p-2 rounded text-sm border border-gray-600">
                                    <option value="1080p" selected>1080p HD</option>
                                    <option value="720p">720p HD</option>
                                    <option value="480p">480p SD</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-sm text-gray-300 mb-1">Taxa de Bits</label>
                                <select ref="bitrateSelect"
                                    class="w-full bg-gray-700 text-white p-2 rounded text-sm border border-gray-600">
                                    <option value="8000000" selected>8 Mbps (Alta)</option>
                                    <option value="5000000">5 Mbps (Média)</option>
                                    <option value="2500000">2.5 Mbps (Baixa)</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-sm text-gray-300 mb-1">Taxa de Quadros</label>
                                <select ref="fpsSelect"
                                    class="w-full bg-gray-700 text-white p-2 rounded text-sm border border-gray-600">
                                    <option value="60">60 FPS</option>
                                    <option value="30" selected>30 FPS</option>
                                    <option value="24">24 FPS</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Coluna Central (Preview + Controles) -->
                <div class="xl:col-span-3 flex flex-col gap-4 min-h-0">

                    <!-- Preview Principal -->
                    <div class="dark-panel rounded-lg p-4 flex-1 flex flex-col min-h-0">
                        <h2 class="text-lg font-semibold text-white mb-3">Preview Principal</h2>

                        <div class="flex-1 preview-container min-h-[350px]">
                            <video ref="previewVideo" class="w-full h-full object-cover" autoplay muted></video>
                            <div ref="previewOverlay" class="preview-overlay">
                                <div class="text-center">
                                    <div
                                        class="w-20 h-20 border-4 border-white rounded-full flex items-center justify-center mb-4 mx-auto">
                                        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                        </svg>
                                    </div>
                                    <p class="text-lg font-medium">Selecione as fontes e inicie a gravação</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Controles e Timer -->
                    <div class="dark-panel rounded-lg p-4 flex-shrink-0">
                        <!-- Timer Central -->
                        <div class="text-center mb-4">
                            <div ref="mainTimer" class="text-3xl font-mono font-bold text-gray-300">00:00:00</div>
                            <p class="text-sm text-gray-400 mt-1">Tempo de gravação</p>
                        </div>

                        <!-- Controles Principais -->
                        <div class="flex flex-wrap items-center justify-center gap-3 mb-4">
                            <button ref="startBtn" @click="startRecording"
                                class="control-button bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold flex items-center space-x-2 transition-all">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <circle cx="10" cy="10" r="8" />
                                </svg>
                                <span>Iniciar</span>
                            </button>

                            <button ref="pauseBtn" @click="pauseRecording"
                                class="control-button bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 opacity-50 cursor-not-allowed"
                                disabled>
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zM13 8a1 1 0 10-2 0v4a1 1 0 102 0V8z" />
                                </svg>
                                <span>Pausar</span>
                            </button>

                            <button ref="stopBtn" @click="stopRecording"
                                class="control-button bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 opacity-50 cursor-not-allowed"
                                disabled>
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8 8a1 1 0 000 2h4a1 1 0 100-2H8z" />
                                </svg>
                                <span>Parar</span>
                            </button>
                        </div>

                        <!-- Audio Level -->
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-sm text-gray-300">Nível do Áudio</span>
                                <span ref="audioLevel" class="text-sm text-gray-400">-∞ dB</span>
                            </div>
                            <div class="waveform">
                                <div ref="audioMeter" class="waveform-active"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Painel Lateral Direito - Gravações -->
                <div class="xl:col-span-1 flex flex-col gap-4 min-h-0">
                    <div class="dark-panel rounded-lg p-4 flex-1 flex flex-col min-h-0">
                        <div class="flex items-center justify-between mb-3">
                            <h2 class="text-lg font-semibold text-white">Gravações</h2>
                            <button ref="clearAllBtn" @click="clearAllRecordings" class="text-red-400 hover:text-red-300 text-xs transition-colors">
                                Limpar
                            </button>
                        </div>

                        <div ref="recordingsList" class="recording-list space-y-3 flex-1 overflow-y-auto">
                            <div class="text-center text-gray-400 py-8">
                                <svg class="w-8 h-8 mx-auto mb-2 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                                </svg>
                                <p class="text-xs">Nenhuma gravação</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { useState } from '#app'

const isDarkMode = useState('isDarkMode', () => false)

// Define layout
definePageMeta({
    layout: 'rec'
})

// SEO and Meta
useHead({
  title: 'REC - Screen Recorder | Professional Recording Tool',
  meta: [
    { name: 'description', content: 'Professional screen recording tool with webcam, microphone and system audio support' },
    { name: 'keywords', content: 'screen recorder, webcam, microphone, recording, video capture' }
  ]
})

// Reactive references for DOM elements
const startBtn = ref(null)
const pauseBtn = ref(null)
const stopBtn = ref(null)
const previewVideo = ref(null)
const webcamPreview = ref(null)
const previewOverlay = ref(null)
const floatingTimer = ref(null)
const mainTimer = ref(null)
const timerDisplay = ref(null)
const statusText = ref(null)
const audioMeter = ref(null)
const audioLevel = ref(null)
const recordingsList = ref(null)
const clearAllBtn = ref(null)
const captureScreen = ref(null)
const captureWebcam = ref(null)
const captureMicrophone = ref(null)
const captureSystemAudio = ref(null)
const qualitySelect = ref(null)
const bitrateSelect = ref(null)
const fpsSelect = ref(null)

// Reactive state
const mediaRecorder = ref(null)
const recordedChunks = ref([])
const stream = ref(null)
const webcamStream = ref(null)
const startTime = ref(null)
const pausedTime = ref(0)
const timerInterval = ref(null)
const audioContext = ref(null)
const analyser = ref(null)
const microphone = ref(null)
const isRecording = ref(false)
const isPaused = ref(false)
const recordings = ref([])

// Computed properties for UI state
const statusIndicatorClass = computed(() => {
  if (isRecording.value && !isPaused.value) return 'status-indicator status-recording recording-pulse'
  if (isPaused.value) return 'status-indicator status-paused'
  return 'status-indicator status-ready'
})

const statusMessage = computed(() => {
  if (isRecording.value && !isPaused.value) return 'Gravando...'
  if (isPaused.value) return 'Pausado'
  return 'Pronto para gravar'
})

// Methods
const updateWebcamPreview = async () => {
  if (captureWebcam.value?.checked) {
    try {
      webcamStream.value = await navigator.mediaDevices.getUserMedia({
        video: { width: 1920, height: 1080 },
        audio: false
      })
      if (webcamPreview.value) {
        webcamPreview.value.srcObject = webcamStream.value
      }
    } catch (error) {
      console.error('Erro ao acessar webcam:', error)
      showNotification('Erro ao acessar webcam', 'error')
    }
  } else {
    if (webcamStream.value) {
      webcamStream.value.getTracks().forEach(track => track.stop())
      webcamStream.value = null
    }
    if (webcamPreview.value) {
      webcamPreview.value.srcObject = null
    }
  }
}

const updateScreenPreview = async () => {
  // Preview da tela não é implementado por questões de segurança
  // Mas podemos mostrar uma indicação visual
}

const startRecording = async () => {
  try {
    await setupMediaStreams()
    await setupRecorder()
    startTimer()
    updateUI('recording')
    showNotification('Gravação iniciada', 'success')
  } catch (error) {
    console.error('Erro ao iniciar gravação:', error)
    showNotification('Erro ao iniciar gravação: ' + error.message, 'error')
  }
}

const setupMediaStreams = async () => {
  const videoTracks = []
  const audioSourcesToMix = []

  // Close previous audio context if it exists
  if (audioContext.value && audioContext.value.state !== 'closed') {
    await audioContext.value.close()
  }

  audioContext.value = new (window.AudioContext || window.webkitAudioContext)()
  const audioDestination = audioContext.value.createMediaStreamDestination()

  // Captura de tela
  if (captureScreen.value?.checked) {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: getResolution().width,
          height: getResolution().height,
          frameRate: parseInt(fpsSelect.value?.value || '30')
        },
        audio: captureSystemAudio.value?.checked
      })
      screenStream.getVideoTracks().forEach(track => videoTracks.push(track))

      if (captureSystemAudio.value?.checked && screenStream.getAudioTracks().length > 0) {
        console.log('Adding system audio to mixer')
        const systemAudioSource = audioContext.value.createMediaStreamSource(new MediaStream([screenStream.getAudioTracks()[0]]))
        systemAudioSource.connect(audioDestination)
        audioSourcesToMix.push('system')
      } else if (captureSystemAudio.value?.checked && screenStream.getAudioTracks().length === 0) {
        console.warn('System audio requested but no audio track available from getDisplayMedia.')
        showNotification('Áudio do sistema solicitado, mas não disponível.', 'warning')
      }

      screenStream.oninactive = () => {
        if (isRecording.value) {
          stopRecording()
          showNotification('Compartilhamento de tela interrompido. Gravação parada.', 'warning')
        }
      }
    } catch (error) {
      console.error('Error accessing screen media:', error)
      showNotification('Erro ao acessar a tela: ' + error.message, 'error')
      throw error
    }
  }

  // Webcam
  if (captureWebcam.value?.checked) {
    try {
      if (!webcamStream.value || !webcamStream.value.active) {
        console.log('Accessing webcam for recording')
        webcamStream.value = await navigator.mediaDevices.getUserMedia({
          video: { width: 1920, height: 1080, frameRate: parseInt(fpsSelect.value?.value || '30') },
          audio: false
        })
        if (!captureScreen.value?.checked && previewVideo.value) {
          previewVideo.value.srcObject = webcamStream.value
          if (previewOverlay.value) {
            previewOverlay.value.style.display = 'none'
          }
        }
      }
      webcamStream.value.getVideoTracks().forEach(track => videoTracks.push(track))

      webcamStream.value.oninactive = () => {
        if (isRecording.value) {
          console.warn('Webcam stream inactive during recording.')
        }
      }
    } catch (error) {
      console.error('Error accessing webcam media:', error)
      showNotification('Erro ao acessar a webcam: ' + error.message, 'error')
    }
  }

  // Microfone
  if (captureMicrophone.value?.checked) {
    try {
      console.log('Accessing microphone for recording')
      const micAudioStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      })
      const micSource = audioContext.value.createMediaStreamSource(micAudioStream)
      micSource.connect(audioDestination)
      audioSourcesToMix.push('microphone')
      setupAudioAnalyzer(micAudioStream)

      micAudioStream.oninactive = () => {
        if (isRecording.value) {
          console.warn('Microphone stream inactive during recording.')
        }
      }
    } catch (error) {
      console.error('Error accessing microphone media:', error)
      showNotification('Erro ao acessar o microfone: ' + error.message, 'error')
      throw error
    }
  }

  // Combine video tracks and the single mixed audio track
  const finalTracks = [...videoTracks]
  if (audioSourcesToMix.length > 0) {
    audioDestination.stream.getAudioTracks().forEach(track => {
      console.log('Adding mixed audio track to final stream')
      finalTracks.push(track)
    })
  } else {
    console.log('No audio sources selected.')
  }

  if (finalTracks.length === 0) {
    throw new Error('Selecione pelo menos uma fonte de vídeo ou áudio para captura')
  }

  stream.value = new MediaStream(finalTracks)

  if (!captureScreen.value?.checked && (captureWebcam.value?.checked || audioSourcesToMix.length > 0)) {
    if (previewVideo.value) {
      previewVideo.value.srcObject = stream.value
    }
    if (previewOverlay.value) {
      previewOverlay.value.style.display = 'none'
    }
  } else if (captureScreen.value?.checked) {
    if (previewVideo.value) {
      previewVideo.value.srcObject = stream.value
    }
    if (previewOverlay.value) {
      previewOverlay.value.style.display = 'none'
    }
  } else {
    if (previewVideo.value) {
      previewVideo.value.srcObject = null
    }
    if (previewOverlay.value) {
      previewOverlay.value.style.display = 'flex'
    }
  }
}

const setupRecorder = async () => {
  if (!stream.value || !stream.value.active) {
    showNotification('Nenhuma stream disponível para gravação.', 'error')
    updateUI('stopped')
    throw new Error('Stream is not active or available.')
  }

  const options = {
    mimeType: 'video/webm;codecs=vp9,opus',
    videoBitsPerSecond: parseInt(bitrateSelect.value?.value || '8000000'),
    audioBitsPerSecond: 128000
  }

  // Fallback para outros codecs se VP9 não estiver disponível
  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    options.mimeType = 'video/webm;codecs=vp8,opus'
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      options.mimeType = 'video/webm'
    }
  }

  mediaRecorder.value = new MediaRecorder(stream.value, options)
  recordedChunks.value = []

  mediaRecorder.value.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.value.push(event.data)
    }
  }

  mediaRecorder.value.onstop = () => {
    saveRecording()
  }

  mediaRecorder.value.start(1000)
  isRecording.value = true
  isPaused.value = false
}

const setupAudioAnalyzer = (audioStream) => {
  analyser.value = audioContext.value.createAnalyser()
  microphone.value = audioContext.value.createMediaStreamSource(audioStream)

  analyser.value.fftSize = 256
  microphone.value.connect(analyser.value)

  updateAudioLevels()
}

const updateAudioLevels = () => {
  if (!analyser.value) return

  const bufferLength = analyser.value.frequencyBinCount
  const dataArray = new Uint8Array(bufferLength)

  const updateLevels = () => {
    if (!isRecording.value) return

    analyser.value.getByteFrequencyData(dataArray)

    let sum = 0
    for (let i = 0; i < bufferLength; i++) {
      sum += dataArray[i]
    }

    const average = sum / bufferLength
    const percentage = (average / 255) * 100

    if (audioMeter.value) {
      audioMeter.value.style.width = percentage + '%'
    }

    const dB = average > 0 ? 20 * Math.log10(average / 255) : -Infinity
    if (audioLevel.value) {
      audioLevel.value.textContent = isFinite(dB) ? dB.toFixed(1) + ' dB' : '-∞ dB'
    }

    requestAnimationFrame(updateLevels)
  }

  updateLevels()
}

const pauseRecording = () => {
  if (mediaRecorder.value && isRecording.value && !isPaused.value) {
    mediaRecorder.value.pause()
    isPaused.value = true
    pausedTime.value += Date.now() - startTime.value
    clearInterval(timerInterval.value)
    updateUI('paused')
    showNotification('Gravação pausada', 'warning')
  } else if (isPaused.value) {
    mediaRecorder.value.resume()
    isPaused.value = false
    startTime.value = Date.now()
    startTimer()
    updateUI('recording')
    showNotification('Gravação retomada', 'success')
  }
}

const stopRecording = () => {
  if (mediaRecorder.value && isRecording.value) {
    mediaRecorder.value.stop()
    isRecording.value = false
    isPaused.value = false

    if (stream.value) {
      stream.value.getTracks().forEach(track => track.stop())
    }

    if (audioContext.value) {
      audioContext.value.close()
    }

    clearInterval(timerInterval.value)
    updateUI('stopped')
    showNotification('Gravação finalizada', 'success')
  }
}

const saveRecording = () => {
  const blob = new Blob(recordedChunks.value, { type: 'video/webm' })
  const duration = formatTime(getTotalRecordingTime())
  const timestamp = new Date().toLocaleString('pt-BR')
  const filename = generateFilename()

  const recording = {
    id: Date.now(),
    blob: blob,
    filename: filename,
    duration: duration,
    timestamp: timestamp,
    size: formatFileSize(blob.size),
    url: URL.createObjectURL(blob)
  }

  recordings.value.unshift(recording)
  saveRecordings()
  renderRecordingsList()

  if (previewOverlay.value) {
    previewOverlay.value.style.display = 'flex'
  }
  if (previewVideo.value) {
    previewVideo.value.srcObject = null
  }
  resetTimer()
}

const generateFilename = () => {
  const now = new Date()
  const date = now.toLocaleDateString('pt-BR').split('/').reverse().join('-')
  const time = now.toLocaleTimeString('pt-BR').replace(/:/g, '-')

  let sources = []
  if (captureScreen.value?.checked) sources.push('Tela')
  if (captureWebcam.value?.checked) sources.push('Webcam')
  if (captureMicrophone.value?.checked) sources.push('Mic')

  return `gravacao-${date}-${time}.webm`
}

const startTimer = () => {
  startTime.value = Date.now()
  timerInterval.value = setInterval(() => {
    const elapsed = getTotalRecordingTime()
    const timeString = formatTime(elapsed)

    if (mainTimer.value) {
      mainTimer.value.textContent = timeString
    }
    if (timerDisplay.value) {
      timerDisplay.value.textContent = timeString
    }
  }, 1000)
}

const getTotalRecordingTime = () => {
  if (!startTime.value) return 0
  const currentTime = isPaused.value ? 0 : (Date.now() - startTime.value)
  return Math.floor((pausedTime.value + currentTime) / 1000)
}

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

const resetTimer = () => {
  startTime.value = null
  pausedTime.value = 0
  clearInterval(timerInterval.value)
  if (mainTimer.value) {
    mainTimer.value.textContent = '00:00:00'
  }
  if (timerDisplay.value) {
    timerDisplay.value.textContent = '00:00:00'
  }
}

const updateUI = (state) => {
  switch (state) {
    case 'recording':
      if (startBtn.value) {
        startBtn.value.disabled = true
        startBtn.value.classList.add('opacity-50', 'cursor-not-allowed')
      }

      if (pauseBtn.value) {
        pauseBtn.value.disabled = false
        pauseBtn.value.classList.remove('opacity-50', 'cursor-not-allowed')
        const span = pauseBtn.value.querySelector('span')
        if (span) span.textContent = 'Pausar'
      }

      if (stopBtn.value) {
        stopBtn.value.disabled = false
        stopBtn.value.classList.remove('opacity-50', 'cursor-not-allowed')
      }

      if (floatingTimer.value) {
        floatingTimer.value.style.display = 'block'
      }
      break

    case 'paused':
      if (pauseBtn.value) {
        const span = pauseBtn.value.querySelector('span')
        if (span) span.textContent = 'Retomar'
      }
      break

    case 'stopped':
      if (startBtn.value) {
        startBtn.value.disabled = false
        startBtn.value.classList.remove('opacity-50', 'cursor-not-allowed')
      }

      if (pauseBtn.value) {
        pauseBtn.value.disabled = true
        pauseBtn.value.classList.add('opacity-50', 'cursor-not-allowed')
        const span = pauseBtn.value.querySelector('span')
        if (span) span.textContent = 'Pausar'
      }

      if (stopBtn.value) {
        stopBtn.value.disabled = true
        stopBtn.value.classList.add('opacity-50', 'cursor-not-allowed')
      }

      if (floatingTimer.value) {
        floatingTimer.value.style.display = 'none'
      }
      if (audioMeter.value) {
        audioMeter.value.style.width = '0%'
      }
      if (audioLevel.value) {
        audioLevel.value.textContent = '-∞ dB'
      }
      break
  }
}

const getResolution = () => {
  const quality = qualitySelect.value?.value || '1080p'
  const resolutions = {
    '1080p': { width: 1920, height: 1080 },
    '720p': { width: 1280, height: 720 },
    '480p': { width: 854, height: 480 }
  }
  return resolutions[quality]
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const renderRecordingsList = () => {
  if (!recordingsList.value) return

  if (recordings.value.length === 0) {
    recordingsList.value.innerHTML = `
      <div class="text-center text-gray-400 py-8">
        <svg class="w-8 h-8 mx-auto mb-2 opacity-50" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"/>
        </svg>
        <p class="text-xs">Nenhuma gravação</p>
      </div>
    `
    return
  }

  recordingsList.value.innerHTML = recordings.value.map(recording => `
    <div class="recording-item bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors border-l-4 border-transparent hover:border-blue-500">
      <div class="flex items-center space-x-3 mb-3">
        <div class="w-12 h-8 bg-gray-900 rounded flex items-center justify-center flex-shrink-0">
          <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="text-white font-medium text-sm truncate">${recording.filename.split('_')[0]}</h4>
          <div class="flex items-center justify-between text-xs text-gray-400 mt-1">
            <span>${recording.duration}</span>
            <span>${recording.size}</span>
          </div>
          <p class="text-xs text-gray-500 mt-1">${recording.timestamp.split(' ')[0]}</p>
        </div>
      </div>
      <div class="flex items-center space-x-1">
        <button onclick="playRecording('${recording.id}')" class="flex-1 bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs font-medium transition-colors flex items-center justify-center space-x-1">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 5v10l8-5-8-5z"/>
          </svg>
          <span>Play</span>
        </button>
        <button onclick="downloadRecording('${recording.id}')" class="flex-1 bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-xs font-medium transition-colors flex items-center justify-center space-x-1">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"/>
          </svg>
          <span>Save</span>
        </button>
        <button onclick="deleteRecording('${recording.id}')" class="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs font-medium transition-colors">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    </div>
  `).join('')
}

// Global functions for onclick handlers (will be available in window)
const playRecording = (id) => {
  const recording = recordings.value.find(r => r.id == id)
  if (recording) {
    createPlaybackModal(recording)
  }
}

const downloadRecording = (id) => {
  const recording = recordings.value.find(r => r.id == id)
  if (recording) {
    const a = document.createElement('a')
    a.href = recording.url
    a.download = recording.filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    showNotification('Download iniciado', 'success')
  }
}

const deleteRecording = (id) => {
  if (confirm('Tem certeza que deseja excluir esta gravação?')) {
    const index = recordings.value.findIndex(r => r.id == id)
    if (index !== -1) {
      URL.revokeObjectURL(recordings.value[index].url)
      recordings.value.splice(index, 1)
      saveRecordings()
      renderRecordingsList()
      showNotification('Gravação excluída', 'success')
    }
  }
}

const createPlaybackModal = (recording) => {
  const existingModal = document.getElementById('playbackModal')
  if (existingModal) {
    existingModal.remove()
  }

  const modal = document.createElement('div')
  modal.id = 'playbackModal'
  modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4'
  modal.innerHTML = `
    <div class="bg-gray-900 rounded-lg p-6 max-w-4xl w-full">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-xl font-semibold text-white">${recording.filename}</h3>
        <button onclick="this.closest('#playbackModal').remove()" class="text-gray-400 hover:text-white">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
          </svg>
        </button>
      </div>
      <video controls class="w-full rounded-lg bg-black" style="max-height: 70vh;">
        <source src="${recording.url}" type="video/webm">
        Seu navegador não suporta a reprodução de vídeo.
      </video>
      <div class="flex items-center justify-between mt-4 text-sm text-gray-400">
        <span>Duração: ${recording.duration}</span>
        <span>Tamanho: ${recording.size}</span>
        <span>Criado em: ${recording.timestamp}</span>
      </div>
    </div>
  `

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove()
    }
  })

  document.body.appendChild(modal)
}

const clearAllRecordings = () => {
  if (recordings.value.length === 0) return

  if (confirm('Tem certeza que deseja excluir todas as gravações?')) {
    recordings.value.forEach(recording => {
      URL.revokeObjectURL(recording.url)
    })
    recordings.value = []
    saveRecordings()
    renderRecordingsList()
    showNotification('Todas as gravações foram excluídas', 'success')
  }
}

const saveRecordings = () => {
  // Em um ambiente real, você salvaria em localStorage
  if (process.client) {
    try {
      const recordingsToSave = recordings.value.map(r => ({
        ...r,
        blob: null, // Não salvar blob no localStorage
        url: null   // Não salvar URL no localStorage
      }))
      localStorage.setItem('recordings', JSON.stringify(recordingsToSave))
    } catch (error) {
      console.log('Erro ao salvar gravações:', error)
    }
  }
  console.log('Gravações salvas:', recordings.value.length)
}

const loadRecordings = () => {
  if (process.client) {
    try {
      const savedRecordings = localStorage.getItem('recordings')
      if (savedRecordings) {
        recordings.value = JSON.parse(savedRecordings)
      }
    } catch (error) {
      console.log('Erro ao carregar gravações:', error)
    }
  }
  recordings.value = []
  nextTick(() => {
    renderRecordingsList()
  })
}

const showNotification = (message, type = 'info') => {
  const existingNotification = document.getElementById('notification')
  if (existingNotification) {
    existingNotification.remove()
  }

  const notification = document.createElement('div')
  notification.id = 'notification'
  notification.className = `fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white font-medium z-50 transition-all duration-300`

  const colors = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    warning: 'bg-yellow-600',
    info: 'bg-blue-600'
  }

  notification.className += ` ${colors[type]}`
  notification.textContent = message

  document.body.appendChild(notification)

  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.opacity = '0'
      notification.style.transform = 'translate(-50%, -100%)'
      setTimeout(() => notification.remove(), 300)
    }
  }, 3000)
}

// Keyboard shortcuts
const handleKeyDown = (e) => {
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case 'r':
        e.preventDefault()
        if (!isRecording.value) {
          startRecording()
        }
        break
      case ' ':
        e.preventDefault()
        if (isRecording.value) {
          pauseRecording()
        }
        break
      case 's':
        e.preventDefault()
        if (isRecording.value) {
          stopRecording()
        }
        break
    }
  }
}

// Make functions available globally for onclick handlers
if (process.client) {
  window.playRecording = playRecording
  window.downloadRecording = downloadRecording
  window.deleteRecording = deleteRecording
}

// Lifecycle hooks
onMounted(() => {
  loadRecordings()
  
  // Setup event listeners
  if (captureWebcam.value) {
    captureWebcam.value.addEventListener('change', updateWebcamPreview)
  }
  if (captureScreen.value) {
    captureScreen.value.addEventListener('change', updateScreenPreview)
  }
  
  document.addEventListener('keydown', handleKeyDown)
  
  // Log shortcuts
  console.log('Atalhos de teclado disponíveis:')
  console.log('Ctrl/Cmd + R: Iniciar gravação')
  console.log('Ctrl/Cmd + Espaço: Pausar/Retomar')
  console.log('Ctrl/Cmd + S: Parar gravação')
})

onUnmounted(() => {
  // Cleanup
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
  }
  
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop())
  }
  
  if (webcamStream.value) {
    webcamStream.value.getTracks().forEach(track => track.stop())
  }
  
  if (audioContext.value && audioContext.value.state !== 'closed') {
    audioContext.value.close()
  }
  
  document.removeEventListener('keydown', handleKeyDown)
  
  // Cleanup global functions
  if (process.client) {
    delete window.playRecording
    delete window.downloadRecording
    delete window.deleteRecording
  }
})
</script>
