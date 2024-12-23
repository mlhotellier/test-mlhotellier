import { useState, useEffect } from "react";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/testimonials/top`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erreur HTTP : ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setTestimonials(data);    
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des données :", err);
        setLoading(false);
        setError(true);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div className="testimonials">
      <h2 className="testimonials__title">Our clients speak</h2>
      <div className="testimonial-list">
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial.id} 
            className="testimonial-item"
            style={{ animationDelay: `${(testimonial.id) * 0.3}s` }}
          >
            <div className="testimonial-bubble">
              <p className="testimonial-title">{testimonial.title}</p>
              <p className="testimonial-message">{testimonial.body}</p>
            </div>
            <div className="testimonial-details" style={{ animationDelay: `${(testimonial.id * 0.3) + 0.4}s` }} >
              <img
                src={testimonial.personPicture}
                alt={testimonial.personName}
                className="testimonial-avatar"
                />
              <p className="testimonial-name">{testimonial.personName}</p>
              <p className="testimonial-company">{testimonial.personCompany}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;