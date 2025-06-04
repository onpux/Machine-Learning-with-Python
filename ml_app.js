// --- Clasificador de Correos (Spam vs No Spam) ---
function classifyEmail() {
  const text = document.getElementById('email-input').value.toLowerCase();
  // Palabras clave simples para demo
  const spamWords = ['free', 'win', 'prize', 'money', 'urgent', 'offer', 'click', 'buy', 'cheap'];
  let score = 0;
  spamWords.forEach(word => { if (text.includes(word)) score++; });
  const result = score >= 2 ? 'Spam' : 'No Spam';
  document.getElementById('email-result').textContent = `Resultado: ${result}`;
}

// --- Predicción de Precios de Vivienda ---
function predictHousePrice() {
  const rooms = parseInt(document.getElementById('rooms').value);
  const area = parseFloat(document.getElementById('area').value);
  const age = parseInt(document.getElementById('age').value);
  if (isNaN(rooms) || isNaN(area) || isNaN(age)) {
    document.getElementById('house-result').textContent = 'Por favor, completa todos los campos.';
    return;
  }
  // Modelo lineal simulado: precio = base + (habitaciones*factor) + (área*factor) - (edad*factor)
  const price = 20000 + rooms*15000 + area*1200 - age*500;
  document.getElementById('house-result').textContent = `Precio estimado: $${price.toLocaleString('es-ES')}`;
}

// --- Detección de Sentimientos ---
function detectSentiment() {
  const text = document.getElementById('sentiment-input').value.toLowerCase();
  // Palabras clave simples para demo
  const positive = ['good', 'great', 'happy', 'love', 'excellent', 'amazing', 'best', 'fantastic', 'awesome'];
  const negative = ['bad', 'sad', 'hate', 'terrible', 'worst', 'awful', 'angry', 'boring', 'disappoint'];
  let pos = 0, neg = 0;
  positive.forEach(word => { if (text.includes(word)) pos++; });
  negative.forEach(word => { if (text.includes(word)) neg++; });
  let result = 'Neutral';
  if (pos > neg) result = 'Positivo';
  else if (neg > pos) result = 'Negativo';
  document.getElementById('sentiment-result').textContent = `Sentimiento detectado: ${result}`;
}
