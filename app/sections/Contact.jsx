'use client';
import { useState } from "react";
import { Star, Loader2, CheckCircle, CreditCard, Shield, Users } from "lucide-react";
import Image from "next/image";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    amount: "",
    city: "",
    phone: "",
    email: "",
    message: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "El nombre completo es obligatorio"
    }

    if (!formData.amount.trim()) {
      newErrors.amount = "La cantidad es obligatoria"
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = "Ingresa una cantidad válida"
    }

    if (!formData.city.trim()) {
      newErrors.city = "La ciudad es obligatoria"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio"
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Ingresa un teléfono válido (10 dígitos)"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Ingresa un correo electrónico válido"
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es obligatorio"
    } else if (formData.message.length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Reset form
      setFormData({
        fullName: "",
        amount: "",
        city: "",
        phone: "",
        email: "",
        message: "",
      })
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact-form" className="relative py-20 px-4 sm:px-6 lg:px-8" style={{
      backgroundImage: "url('/contact.jpeg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}>
      {/* Overlay para mejorar la legibilidad */}
      <div className="absolute inset-0 bg-white/80"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Título de la sección - MANTENIENDO EL ESTILO ORIGINAL */}
        <div className="text-center mb-16">
         

          <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-[#0045ac]">
            ¿Listo para obtener tu <span className="text-[#003a8c]">crédito ideal</span>?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Completa el formulario y nuestro equipo de especialistas se pondrá en contacto contigo
            para ofrecerte la mejor solución crediticia según tu perfil
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg border-0 p-8 md:p-10 lg:p-12">
              <div className="pb-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-[#0045ac]/10 rounded-xl">
                    <CreditCard className="h-8 w-8 text-[#0045ac]" />
                  </div>
                  <h3 className="text-3xl text-gray-900 font-semibold">Asesoría Crediticia</h3>
                </div>
                <p className="text-xl text-gray-600">
                  ¿Tienes dudas y necesitas una solución real?
                </p>
              </div>
              <div className="space-y-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Nos especializamos en colocar tus créditos en instituciones bancarias confiables, facilitando opciones
                  que se adaptan a tu situación.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Completa el formulario y un asesor se pondrá en contacto contigo para ayudarte a tomar el mejor camino
                  financiero.
                </p>

                {/* Benefits */}
                <div className="space-y-6 pt-6">
                  <h4 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
                    <Shield className="h-6 w-6 text-green-600" />
                    Nuestros beneficios
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                      <span className="text-lg text-gray-700">Análisis personalizado de tu perfil</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                      <span className="text-lg text-gray-700">Asesoría personalizada a tu medida</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                      <span className="text-lg text-gray-700">Respuesta rápida</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                      <span className="text-lg text-gray-700">Opciones adaptadas a tu perfil</span>
                    </div>
                  </div>
                </div>

                {/* Trust indicators */}
                <div className="flex items-center gap-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-[#0045ac]" />
                    <span className="text-sm text-gray-600">+1,000 clientes satisfechos</span>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                    Confiable
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl border-0 p-8 md:p-10 lg:p-12">
              <div className="mb-8">
                <h3 className="text-2xl text-gray-900 font-semibold mb-3">Solicita tu asesoría gratuita</h3>
                <p className="text-lg text-gray-600">Completa todos los campos para recibir atención personalizada</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label htmlFor="fullName" className="text-base font-medium text-[#0045ac]">
                      Nombre completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="Tu nombre completo"
                      className={`w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0045ac]/20 focus:border-[#0045ac] ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.fullName && <p className="text-base text-red-600">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="amount" className="text-base font-medium text-[#0045ac]">
                      Cantidad que necesitas <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="amount"
                      type="text"
                      value={formData.amount}
                      onChange={(e) => handleInputChange("amount", e.target.value)}
                      placeholder="$0.00"
                      className={`w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0045ac]/20 focus:border-[#0045ac] ${errors.amount ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.amount && <p className="text-base text-red-600">{errors.amount}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label htmlFor="city" className="text-base font-medium text-[#0045ac]">
                      Ciudad <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="Tu ciudad"
                      className={`w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0045ac]/20 focus:border-[#0045ac] ${errors.city ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.city && <p className="text-base text-red-600">{errors.city}</p>}
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="phone" className="text-base font-medium text-[#0045ac]">
                      Teléfono <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="10 dígitos"
                      className={`w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0045ac]/20 focus:border-[#0045ac] ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.phone && <p className="text-base text-red-600">{errors.phone}</p>}
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="email" className="text-base font-medium text-[#0045ac]">
                    Correo electrónico <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="tu@email.com"
                    className={`w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0045ac]/20 focus:border-[#0045ac] ${errors.email ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.email && <p className="text-base text-red-600">{errors.email}</p>}
                </div>

                <div className="space-y-3">
                  <label htmlFor="message" className="text-base font-medium text-[#0045ac]">
                    Mensaje <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    placeholder="Cuéntanos sobre tu situación financiera y qué tipo de crédito necesitas..."
                    rows={5}
                    className={`w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0045ac]/20 focus:border-[#0045ac] resize-none ${errors.message ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.message && <p className="text-base text-red-600">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0045ac] hover:bg-[#003a8c] text-white py-4 text-xl font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-6 w-6 animate-spin inline" />
                      Enviando solicitud...
                    </>
                  ) : (
                    "Solicitar asesoría crediticia"
                  )}
                </button>

                <p className="text-base text-gray-500 text-center">
                  Al enviar este formulario, aceptas que nos pongamos en contacto contigo para brindarte información
                  sobre nuestros servicios.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
