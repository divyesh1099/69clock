"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        color: "white",
        fontSize: "16px",
        textAlign: "center",
        padding: "10px 20px",
        borderRadius: "10px",
        background: "rgba(0, 0, 0, 0.7)", // Semi-transparent black
        backdropFilter: "blur(5px)", // Frosted-glass effect
        boxShadow: "0px 0px 15px rgba(0, 200, 255, 0.5)", // Blue glow effect
      }}
    >
      <span style={{ color: 'black' }}>❤️Moti</span>
      <br />
      <Link href="https://github.com/divyesh1099" target="_blank" style={{ marginRight: "10px", color: "cyan" }}>
        GitHub
      </Link>
      |
      <Link href="https://www.linkedin.com/in/motidivya" target="_blank" style={{ marginLeft: "10px", color: "lightblue" }}>
        LinkedIn
      </Link>
    </div>
  );
}
