export const attendeeConfigurations = {
    goodnewsdaycamp: {
        fields: [
            'address', 'church', 'child_age', 'child_birthday', 'child_name', 
            'child_tshirt_size', 'city', 'country', 'email', 'medical_needs', 
            'parent_full_name', 'state', 'zip', 'guardian', 'date', 'profession', 
            'assurance'
        ],
        initialValues: {
            address: '', church: '', child_age: '', child_birthday: '', child_name: '',
            child_tshirt_size: '', city: '', country: '', email: '', medical_needs: '', 
            parent_full_name: '', state: '', zip: '', guardian: '', date: '', 
            profession: false, assurance: false
        },
        validations: {
            address: [(value) => value.length > 0, 'Address is required'],
            child_name: [(value) => value.length > 0, 'Child name is required'],
            parent_full_name: [(value) => value.length > 0, 'Parent name is required'],
            date: [(value) => value.length > 0, 'Date is required'],
            // Agrega otras validaciones según sea necesario
        },
    },
    fivedayclub: {
        fields: [
            'address', 'age', 'assurance', 'church', 'county', 'date', 'guardian', 'name', 'profession'
        ],
        attendanceDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        initialValues: {
            address: '', age: '', assurance: false, church: '', county: '', date: '', 
            friday: false, guardian: '', monday: false, name: '', profession: false, 
            thursday: false, tuesday: false, wednesday: false
        },
        validations: {
            name: [(value) => value.length > 0, 'Name is required'],
            guardian: [(value) => value.length > 0, 'Guardian is required'],
            date: [(value) => value.length > 0, 'Date is required'],
            // Agrega otras validaciones según sea necesario
        },
    },
    
    goodnewsclub: {
        fields: [
            'address', 'age', 'assurance', 'church', 'county', 'date', 'guardian', 'name', 'profession'
        ],
        initialValues: {
            address: '', age: '', assurance: false, church: '', county: '', date: '', 
            guardian: '', name: '', profession: false
        },
        validations: {
            name: [(value) => value.length > 0, 'Name is required'],
            date: [(value) => value.length > 0, 'Date is required'],
            // Agrega otras validaciones según sea necesario
        },
    },
    releasedtimes: {
        fields: [
            'address', 'age', 'assurance', 'church', 'county', 'date', 'guardian', 'name', 'profession'
        ],
        initialValues: {
            address: '', age: '', assurance: false, church: '', county: '', date: '', 
            guardian: '', name: '', profession: false
        },
        validations: {
            name: [(value) => value.length > 0, 'Name is required'],
            guardian: [(value) => value.length > 0, 'Guardian is required'],
            date: [(value) => value.length > 0, 'Date is required'],
            // Agrega otras validaciones según sea necesario
        },
    },
    teachertrainingclass: {
        fields: ['address', 'email', 'firstName', 'lastName', 'phone'],
        initialValues: {
            address: '', email: '', firstName: '', lastName: '', phone: ''
        },
        validations: {
            email: [(value) => /\S+@\S+\.\S+/.test(value), 'Valid email is required'],
            firstName: [(value) => value.length > 0, 'First name is required'],
            lastName: [(value) => value.length > 0, 'Last name is required'],
            phone: [(value) => value.length > 0, 'Phone number is required'],
        },
    }
};
