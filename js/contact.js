// ===== Contact form integration (Production-safe) =====

document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    const submitBtn = contactForm.querySelector("button");
    const API_URL = "https://devportfolio-1-zvc0.onrender.com/api/contact";

    let isSubmitting = false;

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        isSubmitting = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = "Sending…";
        submitBtn.disabled = true;

        // AbortController for timeout (Render cold start safe)
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 65000); // 65 sec

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, message }),
                signal: controller.signal
            });

            clearTimeout(timeout);

            if (!response.ok) {
                throw new Error("Server error");
            }

            const text = await response.text();
            alert(text || "Message sent successfully!");
            contactForm.reset();

        } catch (error) {
            console.error("Contact error:", error);

            if (error.name === "AbortError") {
                alert(
                    "The server is waking up (free hosting). Please wait a few seconds and try again."
                );
            } else {
                alert("Failed to send message. Please try again later.");
            }
        } finally {
            clearTimeout(timeout);
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            isSubmitting = false;
        }
    });
});
