import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About Us - Ecommerce App"}>
      <div className="row about">
        <div className="col-md-6">
          <img src="/images/about.jpeg" alt="about" style={{ width: "100%" }} />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Welcome to our eCommerce platform, where quality meets convenience.
            We are committed to providing a seamless shopping experience with a
            wide range of reliable products at competitive prices. Our team
            works around the clock to ensure timely deliveries and exceptional
            customer support. At the heart of our service is a passion for
            customer satisfaction and trust. Thank you for choosing us as your
            go-to online store.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
