export const formFields = {
  '5-Day Club': {
    fields: ['date', 'time', 'phone', 'address', 'city', 'state', 'zip', 'missionary', 'comments', 'helper', 'offering'],
    initialValues: {
      date: '',
      time: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      missionary: '',
      comments: '',
      helper: '',
      offering: '00.00',
      eventType: 'fivedayclub',
    },
    validations: {
      date: [(value) => value.length > 0, 'Date is required'],
      time: [(value) => value.length > 0, 'Time is required'],
  
    },
  },
  'Good News Camp': {
    fields: ['date', 'time', 'phone', 'address', 'city', 'state', 'zip', 'county', 'missionary', 'comments', 'offering'],
    initialValues: {
      date: '',
      time: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      county: '',
      missionary: '',
      comments: '',
      offering: '00.00',
      eventType: 'goodnewsdaycamp',
    },
    validations: {
      date: [(value) => value.length > 0, 'Date is required'],
      time: [(value) => value.length > 0, 'Time is required'],
    
    },
  },
  'Teacher Training Classes': {
    fields: ['date', 'time', 'county', 'location'],
    initialValues: {
      date: '',
      time: '',
      county: '',
      location: '',
      eventType: 'teachertrainingclass',
    },
    validations: {
      date: [(value) => value.length > 0, 'Date is required'],
      time: [(value) => value.length > 0, 'Time is required'],
    },
  },
  'Good News Club': {
    fields: ['date', 'time', 'phone', 'address', 'city', 'state', 'zip', 'missionary', 'comments', 'hostess', 'offering'],
    initialValues: {
      date: '',
      time: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      missionary: '',
      comments: '',
      hostess: '',
      offering: '00.00',
      eventType: 'goodnewsclub',
    },
    validations: {
      date: [(value) => value.length > 0, 'Date is required'],
      time: [(value) => value.length > 0, 'Time is required'],
      
    },
  },
  'Released Times': {
    fields: ['date', 'time', 'phone', 'address', 'city', 'state', 'zip', 'missionary', 'comments', 'hostess', 'offering'],
    initialValues: {
      date: '',
      time: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      missionary: '',
      comments: '',
      hostess: '',
      offering: '00.00',
      eventType: 'releasedtimes',
    },
    validations: {
      date: [(value) => value.length > 0, 'Date is required'],
      time: [(value) => value.length > 0, 'Time is required'],
    },
  },
};
