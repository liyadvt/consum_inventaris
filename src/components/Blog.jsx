import React from "react";

export default function Blog() {
    const benefits = [
        {
            title: "Efficient Inventory Management",
            description: "Easily track and manage inventory levels, orders, and deliveries.",
            image: "./public/blog/1.jpg",
            tags: ["Efficiency", "Management"]
        },
        {
            title: "Cost Savings",
            description: "Reduce costs by minimizing excess stock and preventing stockouts.",
            image: "./public/blog/3.jpg",
            tags: ["Savings", "Cost Reduction"]
        },
        {
            title: "Improved Accuracy",
            description: "Enhance accuracy with real-time inventory updates and data insights.",
            image: "./public/blog/4.jpg",
            tags: ["Accuracy", "Data"]
        }
    ];

    return (
        <div className="relative bg-gradient-to-b from-pink-300 to-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Benefits from</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">inventory application</p>
                </div>
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="transition-transform transform hover:scale-105 card w-70 bg-base-100 shadow-purple-300 shadow-inner shadow-xl">
                            <figure>
                                <img src={benefit.image} alt={benefit.title} className="w-full h-48 object-cover" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title text-indigo-500">
                                    {benefit.title}
                                </h2>
                                <p>{benefit.description}</p>
                                <div className="card-actions justify-end">
                                    {benefit.tags.map((tag, tagIndex) => (
                                        <div key={tagIndex} className="badge badge-outline text-white p-3 bg-indigo-400 shadow-inner shadow-lg">{tag}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
