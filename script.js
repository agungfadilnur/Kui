class IoTController {
  constructor() {
    this.devices = {
      1: { name: "Device 1", status: false },
      2: { name: "Device 2", status: false },
      3: { name: "Device 3", status: false },
      4: { name: "Device 4", status: false },
    }

    this.sensorData = {
      temperature: 8,
      humidity: 0,
    }

    this.init()
  }

  init() {
    this.bindEvents()
    this.startSensorUpdates()
    this.updateUI()
  }

  bindEvents() {
    // Control button events
    document.querySelectorAll(".control-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const deviceId = e.currentTarget.dataset.device
        this.toggleDevice(deviceId)
      })
    })

    // Refresh button event
    document.querySelector(".refresh-icon").addEventListener("click", () => {
      this.refreshData()
    })

    // WiFi status check
    document.querySelector(".wifi-icon").addEventListener("click", () => {
      this.checkConnection()
    })
  }

  toggleDevice(deviceId) {
    const button = document.querySelector(`[data-device="${deviceId}"]`)
    const device = this.devices[deviceId]

    // Add loading state
    button.classList.add("loading")

    // Simulate API call delay
    setTimeout(() => {
      device.status = !device.status
      button.classList.remove("loading")

      if (device.status) {
        button.classList.add("active")
        this.showNotification(`${device.name} turned ON`)
      } else {
        button.classList.remove("active")
        this.showNotification(`${device.name} turned OFF`)
      }

      // Send command to IoT device (simulate)
      this.sendCommand(deviceId, device.status)
    }, 500)
  }

  sendCommand(deviceId, status) {
    // Simulate sending command to IoT device
    console.log(`Sending command to device ${deviceId}: ${status ? "ON" : "OFF"}`)

    // In real implementation, you would make an HTTP request here
    // fetch(`/api/devices/${deviceId}`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ status: status })
    // });
  }

  startSensorUpdates() {
    // Update sensor data every 5 seconds
    setInterval(() => {
      this.updateSensorData()
    }, 5000)
  }

  updateSensorData() {
    // Simulate sensor data updates
    this.sensorData.temperature = Math.floor(Math.random() * 15) + 5 // 5-20°C
    this.sensorData.humidity = Math.floor(Math.random() * 80) + 20 // 20-100%

    document.getElementById("temperature").textContent = `${this.sensorData.temperature}°C`
    document.getElementById("humidity").textContent = `${this.sensorData.humidity}%`

    // In real implementation, you would fetch from API
    // fetch('/api/sensors')
    //     .then(response => response.json())
    //     .then(data => {
    //         this.sensorData = data;
    //         this.updateSensorDisplay();
    //     });
  }

  refreshData() {
    const refreshIcon = document.querySelector(".refresh-icon")
    refreshIcon.style.transform = "rotate(360deg)"
    refreshIcon.style.transition = "transform 0.5s ease"

    setTimeout(() => {
      refreshIcon.style.transform = "rotate(0deg)"
    }, 500)

    // Refresh all data
    this.updateSensorData()
    this.showNotification("Data refreshed")
  }

  checkConnection() {
    const wifiIcon = document.querySelector(".wifi-icon")

    // Simulate connection check
    wifiIcon.classList.add("loading")

    setTimeout(() => {
      wifiIcon.classList.remove("loading")
      const isConnected = navigator.onLine

      if (isConnected) {
        this.showNotification("Connected to WiFi")
        wifiIcon.style.color = "#4CAF50"
      } else {
        this.showNotification("No internet connection")
        wifiIcon.style.color = "#f44336"
      }

      setTimeout(() => {
        wifiIcon.style.color = ""
      }, 2000)
    }, 1000)
  }

  showNotification(message) {
    // Create notification element
    const notification = document.createElement("div")
    notification.textContent = message
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            font-size: 14px;
            z-index: 1000;
            animation: slideDown 0.3s ease;
        `

    document.body.appendChild(notification)

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.animation = "slideUp 0.3s ease"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }

  updateUI() {
    // Update device states on page load
    Object.keys(this.devices).forEach((deviceId) => {
      const button = document.querySelector(`[data-device="${deviceId}"]`)
      const device = this.devices[deviceId]

      if (device.status) {
        button.classList.add("active")
      }
    })
  }
}

// Add CSS animations for notifications
const style = document.createElement("style")
style.textContent = `
    @keyframes slideDown {
        from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    
    @keyframes slideUp {
        from { transform: translateX(-50%) translateY(0); opacity: 1; }
        to { transform: translateX(-50%) translateY(-100%); opacity: 0; }
    }
`
document.head.appendChild(style)

// Initialize the IoT controller when page loads
document.addEventListener("DOMContentLoaded", () => {
  new IoTController()
})

// Handle online/offline status
window.addEventListener("online", () => {
  document.querySelector(".wifi-icon").style.color = "#4CAF50"
})

window.addEventListener("offline", () => {
  document.querySelector(".wifi-icon").style.color = "#f44336"
})
