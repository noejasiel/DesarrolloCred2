'use client';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/buttonContact";
import { Input } from "../../components/inputContact";
import { Textarea } from "../../components/textareaContact";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/selectConatc";
import { Checkbox } from "../../components/checkboxContact";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/formContact";
import { Star, Loader2 } from "lucide-react";
import "./dynamic-bg.css";

const fadeInDown = {
  animation: 'fadeInDown 0.5s ease-out forwards',
};

const fadeOutUp = {
  animation: 'fadeOutUp 0.5s ease-out forwards',
};

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showSuccessShadow, setShowSuccessShadow] = useState(false);
  const [showErrorShadow, setShowErrorShadow] = useState(false);

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      inquiryType: "",
      message: "",
      privacyAgreed: "false",
    },
  });

  const onSubmit = async (data) => {
    if (isButtonDisabled) {
      setErrorMessage("Por favor espera un momento antes de intentar nuevamente.");
      setShowErrorShadow(true);
      setTimeout(() => {
        setShowErrorShadow(false);
      }, 2000);
      return;
    }


    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");
    setIsButtonDisabled(true);
    setShowSuccessShadow(false);
    setShowErrorShadow(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        form.reset();
        setSuccessMessage("¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.");
        setShowSuccessShadow(true);
        setIsSubmitting(false);
        setTimeout(() => {
          setSuccessMessage("");
          setIsButtonDisabled(false);
          setShowSuccessShadow(false);
        }, 3000);
      } else {
        throw new Error("Error enviando el correo");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setErrorMessage("Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.");
      setShowErrorShadow(true);
      setIsSubmitting(false);
      setTimeout(() => {
        setErrorMessage("");
        setIsButtonDisabled(false);
        setShowErrorShadow(false);
      }, 2000);
    }
  };

  return (
  
      <section
      id="contact-form" className="dynamic-container">
      
        {/* Fondos animados estilo glow */}
        <div className="glow-circle glow-white" style={{ top: "5%", left: "10%", width: "300px", height: "300px" }} />
        <div className="glow-circle glow-gray" style={{ bottom: "10%", right: "5%", width: "400px", height: "400px", animationDelay: "2s" }} />
        <div className="glow-circle glow-outline" style={{ top: "50%", left: "40%", width: "200px", height: "200px", animationDelay: "5s" }} />
       

        <div className="bg-fade-bottom"></div>
        <div className="dynamic-content">
          <div className="absolute inset-0 ">
            <div className="absolute top-10 right-20 w-64 h-64 modern-gradient rounded-full opacity-10 blur-3xl floating-animation"></div>
            <div
              className="absolute bottom-10 left-20 w-80 h-80 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-5 blur-3xl floating-animation"
              style={{ animationDelay: "3s" }}
            ></div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <Star className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-sm text-white/80">
                  Respuesta garantizada en 2 horas
                </span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white">
                Cuéntanos cómo podemos<br />
                <span className="gradient-text">ayudarte</span>
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Completa el formulario y nos pondremos en contacto contigo con una
                solución personalizada
              </p>
            </div>

            <div className={`rounded-3xl p-8 lg:p-12 bg-[#3b3a39]/20 backdrop-blur-md border-white/10 transition-all duration-500 ${
              showSuccessShadow ? 'shadow-[0_0_10px_rgba(124,58,237,0.7)]' : 
              showErrorShadow ? 'shadow-[0_0_10px_rgba(239,68,68,0.7)]' : ''
            }`}>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Espacio reservado para los mensajes */}
                  <div className="h-16">
                    {successMessage && (
                      <div className="animate-fade-in-down">
                        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-md border border-purple-500/30 rounded-xl text-purple-300 px-6 py-3 shadow-lg text-center">
                          {successMessage}
                        </div>
                      </div>
                    )}
                    {errorMessage && (
                      <div className="animate-fade-in-down">
                        <div className="bg-gradient-to-r from-red-600/10 to-rose-600/10 backdrop-blur-md border border-red-500/30 rounded-xl text-red-300 px-6 py-3 shadow-lg text-center">
                          {errorMessage}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Nombre */}
                    <FormField
                      control={form.control}
                      name="fullName"
                      rules={{
                        required: "El nombre es obligatorio",
                        minLength: {
                          value: 2,
                          message: "El nombre debe tener al menos 2 caracteres",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-white mb-2 block ra ">
                            Nombre completo *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Tu nombre completo"
                              className="form-input rounded-3xl"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      rules={{
                        required: "El correo es obligatorio",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Correo inválido",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-white mb-2 block">
                            Correo electrónico *
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="tu@email.com"
                              className="form-input"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Teléfono */}
                    <FormField
                      control={form.control}
                      name="phone"
                      rules={{
                        pattern: {
                          value: /^\+?\d{1,3}[-\s]?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,4}$/,
                          message: "Teléfono inválido",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-white mb-2 block">
                            Teléfono
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="+52 55 1234 5678"
                              className="form-input"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Empresa */}
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-white mb-2 block">
                            Empresa
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nombre de tu empresa"
                              className="form-input"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Asunto */}
                  <FormField
                    control={form.control}
                    name="inquiryType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white mb-2 block">
                          Asunto
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="form-input">
                              <SelectValue placeholder="Selecciona un asunto" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-slate-800 border-white/0">
                            <SelectItem value="cuenta-empresarial">Cuenta empresarial</SelectItem>
                            <SelectItem value="credito-empresarial">Crédito empresarial</SelectItem>
                            <SelectItem value="tarjeta-debito">Tarjeta de débito</SelectItem>
                            <SelectItem value="soporte-tecnico">Soporte técnico</SelectItem>
                            <SelectItem value="otro">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />


                  {/* Mensaje */}
                  <FormField
                    control={form.control}
                    name="message"
                    rules={{
                      required: "El mensaje es obligatorio",
                      minLength: {
                        value: 10,
                        message: "El mensaje debe tener al menos 10 caracteres",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white mb-2 block">
                          Mensaje *
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Describe tu consulta o necesidad..."
                            className="form-input resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Privacidad */}
                  <FormField
                    control={form.control}
                    name="privacyAgreed"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value === "true"}
                            onChange={(e) => field.onChange(e.target.checked ? "true" : "false")}
                            className="h-4 w-4 rounded border-white/20 text-purple-500 focus:ring-purple-500"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-gray-300">
                            Acepto los{" "}
                            <a
                              href="#"
                              className="text-purple-400 underline hover:text-purple-300"
                            >
                              términos y condiciones
                            </a>{" "}
                            y la{" "}
                            <a
                              href="#"
                              className="text-purple-400 underline hover:text-purple-300"
                            >
                              política de privacidad
                            </a>{" "}
                            *
                          </FormLabel>
                        </div>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Botón de envío */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      variant="gradientSoft"
                      disabled={isSubmitting }
                      className="w-full rounded-xl py-4 text-lg font-medium transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Enviando...
                        </div>
                      ) : (
                        "Enviar mensaje"
                      )}
                    </Button>

                  </div>

                </form>
              </Form>

            </div>
          </div>
        </div>

    </section >
  );
}
