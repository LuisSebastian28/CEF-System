import React from 'react';

export const FiveDayClubForm = () => (
  <div>
    <h3 className="text-xl font-bold mb-4">5-Day Club</h3>
    <form className="grid grid-cols-3 gap-4">
      <div className="col-span-1">
        <label htmlFor="club" className="block">Club</label>
        <input type="text" id="club" className="w-full p-2 border rounded" placeholder="Enter club name" />
      </div>
      <div className="col-span-1">
        <label htmlFor="date" className="block">Date</label>
        <input type="date" id="date" className="w-full p-2 border rounded" />
      </div>
      <div className="col-span-1">
        <label htmlFor="time" className="block">Time</label>
        <input type="text" id="time" className="w-full p-2 border rounded" placeholder="Enter time" />
      </div>
      <div className="col-span-1">
        <label htmlFor="hostess" className="block">Hostess</label>
        <input type="text" id="hostess" className="w-full p-2 border rounded" placeholder="Enter hostess name" />
      </div>
      <div className="col-span-1">
        <label htmlFor="phone" className="block">Phone</label>
        <input type="text" id="phone" className="w-full p-2 border rounded" placeholder="Enter phone number" />
      </div>
      <div className="col-span-3">
        <label htmlFor="address" className="block">Address</label>
        <input type="text" id="address" className="w-full p-2 border rounded" placeholder="Enter address" />
      </div>
      <div className="col-span-1">
        <label htmlFor="city" className="block">City</label>
        <input type="text" id="city" className="w-full p-2 border rounded" placeholder="Enter city" />
      </div>
      <div className="col-span-1">
        <label htmlFor="state" className="block">State</label>
        <input type="text" id="state" className="w-full p-2 border rounded" placeholder="Enter state" />
      </div>
      <div className="col-span-1">
        <label htmlFor="zip" className="block">Zip</label>
        <input type="text" id="zip" className="w-full p-2 border rounded" placeholder="Enter zip code" />
      </div>
      <div className="col-span-3">
        <label htmlFor="otherMissionary" className="block">Other Missionary</label>
        <input type="text" id="otherMissionary" className="w-full p-2 border rounded" placeholder="Enter other missionary's name" />
      </div>
      <div className="col-span-3">
        <label htmlFor="additionalComments" className="block">Additional Comments</label>
        <textarea id="additionalComments" className="w-full p-2 border rounded" placeholder="Enter additional comments"></textarea>
      </div>
      <div className="col-span-3 text-right">
        <button type="submit" className="px-4 py-2 bg-black text-white rounded">Submit</button>
      </div>
    </form>
  </div>
);
