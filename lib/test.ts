import { assertEquals } from "@std/assert";
import { getThreeTopTestimonials, testimonials } from "./testimonials.ts";

Deno.test("Does getThreeTopTestimonials return in descending order", () => {
    const toTestTestimonials = getThreeTopTestimonials(testimonials);
  
    assertEquals(toTestTestimonials[0].rating, 5, "Le premier témoignage est incorrect");
    assertEquals(toTestTestimonials[1].rating, 4, "Le deuxième témoignage est incorrect");
    assertEquals(toTestTestimonials[2].rating, 3, "Le troisième témoignage est incorrect");
});

Deno.test("Does getThreeTopTestimonials return 3 testimonials", () => {
    const toTestTestimonials = getThreeTopTestimonials(testimonials);

    assertEquals(toTestTestimonials.length, 3, "Le premier témoignage est incorrect");
})
