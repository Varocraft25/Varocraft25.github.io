// Variables globales para el cálculo de FPS y actualización del gráfico
let lastFrameTime = performance.now();
let lastFpsUpdate = 0;
let fpsSum = 0;
let fpsCount = 0;
let averageFps = 0;
const fpsDisplay = document.getElementById('fps');
const ctx = document.getElementById('fpsChart').getContext('2d');
let fpsChart = null;

function createChart() {
    const fpsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'FPS',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: 'origin', // Rellena desde el origen (eje y = 0)
                backgroundColor: 'rgba(255, 0, 0, 0.2)', // Color de fondo rojo con transparencia
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    return fpsChart
}


// Función para el bucle principal
function startSimulation(pointCount, updateTime, fpsChart) {
    // Calcula el tiempo transcurrido desde el último fotograma
    const currentTime = performance.now();
    const elapsedTime = currentTime - lastFrameTime;
    lastFrameTime = currentTime;

    // Calcula los FPS en tiempo real
    const fps = 1000 / elapsedTime;

    // Actualiza el gráfico de FPS
    updateFpsChart(fps, pointCount, updateTime, fpsChart);

    // Llama al bucle principal de forma recursiva
    requestAnimationFrame(() => startSimulation(pointCount, updateTime, fpsChart));
}


// Función para actualizar el gráfico de FPS cada segundo
function updateFpsChart(fps, pointCount, updateTime, fpsChart) {

    const speedUpdate = updateTime/pointCount

    if (Date.now() - lastFpsUpdate > speedUpdate) { // Actualiza cada segundo
        lastFpsUpdate = Date.now();

        // Calcula el promedio de los FPS anteriores
        if (fpsCount > 0) {

            averageFps = fpsSum / fpsCount;

            // Reinicia el contador y la suma
            fpsSum = 0;
            fpsCount = 0;

            // Limita el número de puntos en el gráfico a pointCount
            if (fpsChart.data.labels.length <= pointCount) {

                // Añade el promedio al gráfico
                fpsChart.data.labels.push('');
                fpsChart.data.datasets[0].data.push(averageFps);

                // Actualiza el gráfico
                fpsChart.update();
            }
        }
    }

    // Incrementa la suma y el contador de FPS
    fpsSum += fps;
    fpsCount++;
}

document.getElementById('startSimulation').addEventListener('click', function() {
    const pointCount = parseInt(document.getElementById('pointCount').value);
    const updateTime = parseInt(document.getElementById('updateTime').value);
    if (fpsChart !== null) {
        fpsChart.destroy();
    }
    fpsChart = createChart();
    startSimulation(pointCount, updateTime, fpsChart);
});