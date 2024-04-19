import React, { useRef } from 'react';
import "./ContactFormStyles.css";

function ContactForm() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_6f4diqn', 'template_3r2cpfa', form.current, {
        publicKey: 'PveguHgd44LUsnsSH',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          alert('Email sent successfully!');
          // Reset the form
          e.target.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert('Failed to send email. Please try again later.');
        }
      );
  };

  return (
    <div className="form-container">
      <form className="contact-form" ref={form} onSubmit={sendEmail}>
        <h2>Contact Us</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="user_name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="user_email" required />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" name="subject" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" required></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}


export default ContactForm;
