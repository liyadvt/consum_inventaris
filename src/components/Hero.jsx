import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Hero() {
  return (
    <>
      <div className="relative isolate">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          ></div>
        </div>
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-32">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              New Feature: Real-Time Inventory Tracking {' '}
              <a href="#" className="font-semibold text-indigo-400">
                <FontAwesomeIcon icon="fa-solid fa-folder-open" />
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Make It Simple Your Inventory Management
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Effortlessly track and manage your stock, inbounds, and restoration. Boost your efficiency and ensure you never run out of critical items.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href={'/login'}
                className="rounded-full bg-indigo-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 shadow-lg shadow-indigo-500"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          ></div>
        </div>

        <div className="relative bg-gradient-to-b from-white to-pink-300 -z-10 py-2 sm:py-16 transition duration-500 ease-in-out">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-500">Learn more</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Features</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">Features that will help you simplify the process of inventorying goods.</p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-400 hover:bg-indigo-500">
                      <FontAwesomeIcon icon="fa-solid fa-plus"  className="h-6 w-6 text-white"/>
                    </div>
                    Create, Read, Update, Delete
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">CRUD your stuffs, inbounds, lending, etc.</dd>
                </div>
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-400 hover:bg-indigo-500">
                    <FontAwesomeIcon icon="fa-solid fa-upload"  className="h-6 w-6 text-white"/>
                    </div>
                    Input your inbound with picture
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">makes it easier for you to record items with evidence</dd>
                </div>
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-400 hover:bg-indigo-500">
                    <FontAwesomeIcon icon="fa-solid fa-chart-simple" className="h-6 w-6 text-white"/>
                    </div>
                    monitoring lending and repayment data
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">can easily monitor loan and return data with curves and cards.</dd>
                </div>
                <div className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-400 hover:bg-indigo-500">
                    <FontAwesomeIcon icon="fa-regular fa-user" className="h-6 w-6 text-white"/>
                    </div>
                    Authentification
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">Authentification for role admin and staff only.</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

