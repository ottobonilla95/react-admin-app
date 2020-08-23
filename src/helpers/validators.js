import moment from 'moment';

export const validateMassiveCustomers = (customers) => {
  var counter = 1;
  for (const customer of customers) {
    if (
      !customer.name ||
      !customer.mobile_number ||
      !customer.email ||
      !customer.country ||
      !customer.state ||
      !customer.street_name ||
      !customer.latitude ||
      !customer.longitude
    ) {
      return counter;
    }

    if (!validateEmail(customer.email)) {
      return counter;
    }
    if (!validateMoibleNumber(customer.mobile_number)) {
      return counter;
    }

    counter++;
  }

  return 0;
};

export const validateMassiveAgents = (agents) => {
  var counter = 1;

  for (const agent of agents) {
    if (
      !agent.first_name ||
      !agent.last_name ||
      !agent.username ||
      !agent.password ||
      !agent.email ||
      !agent.mobile_number ||
      !agent.country
    ) {
      return counter;
    }

    if (!validateEmail(agent.email)) {
      return counter;
    }
    if (!validateMoibleNumber(agent.mobile_number)) {
      return counter;
    }

    counter++;
  }

  return 0;
};

export const validateMassiveProducts = (products) => {
  var counter = 1;

  for (const product of products) {
    if (
      !product.name ||
      !product.upc ||
      !product.category ||
      !product.sub_category ||
      !product.brand ||
      !product.sub_brand ||
      !product.container ||
      !product.volume ||
      !product.width_size ||
      !product.height_size
    ) {
      return counter;
    }

    counter++;
  }

  return 0;
};

export const validateMassiveTasks = (tasks) => {
  var counter = 1;

  for (const task of tasks) {
    if (
      !task.customer_id ||
      !task.planogram_id ||
      !task.start_before ||
      !task.complete_before
    ) {
      return counter;
    }

    if (!validateDate(task.start_before)) {
      return counter;
    }
    if (!validateDate(task.complete_before)) {
      return counter;
    }
    counter++;
  }

  return 0;
};

const validateEmail = (email) => {
  var re = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/);
  if (re.test(email)) {
    return true;
  } else {
    return false;
  }
};

const validateMoibleNumber = (number) => {
  var re = new RegExp(
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  );
  if (re.test(number)) {
    return true;
  } else {
    return false;
  }
};

const validateDate = (dateIn) => {
  var date = moment(dateIn);

  if (date.isValid()) {
    return true;
  } else {
    return false;
  }
};
