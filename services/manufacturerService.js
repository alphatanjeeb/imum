const getAllProducts = require('../models/productModel').getAllProducts;
const getAllProductMatches = require('../models/productModel').getAllProductMatches;
const fuzzy = require('fuzzy');

const mapRelatedManufacturers = async () => {
  const products = await getAllProducts();
  const matches = await getAllProductMatches();
  const manufacturerMap = {};

  const manufacturers = [...new Set(products.map(p => p.manufacturer))];

  products.forEach((product) => {
    const { title, manufacturer, source, source_id } = product;
    const key = source + source_id;
    if (!manufacturerMap[key]) {
      manufacturerMap[key] = manufacturer || 'Unknown';
    }
  });

  matches.forEach((match) => {
    const { m_source, m_source_id, c_source, c_source_id } = match;
    const m_key = m_source + m_source_id;
    const c_key = c_source + c_source_id;

    if (manufacturerMap[m_key] && manufacturerMap[c_key]) {
      if (!manufacturerMap[m_key].includes(manufacturerMap[c_key])) {
        manufacturerMap[m_key].push(manufacturerMap[c_key]);
      }
      if (!manufacturerMap[c_key].includes(manufacturerMap[m_key])) {
        manufacturerMap[c_key].push(manufacturerMap[m_key]);
      }
    }
  });

  return manufacturerMap;
};

const assignManufacturerFromTitle = async (title) => {
  const manufacturerMap = await mapRelatedManufacturers();
  let assignedManufacturer = 'Unknown';

  for (const key in manufacturerMap) {
    if (title.includes(manufacturerMap[key])) {
      assignedManufacturer = manufacturerMap[key];
      break;
    }
  }

  return assignedManufacturer;
};

module.exports = {
  mapRelatedManufacturers,
  assignManufacturerFromTitle,
};
