import axios from 'axios';

export const getData = async () => {
  try {
    let res = await axios.get('https://kyupid-api.vercel.app/api/areas');
    let areaData = {};

    res.data.features.forEach((area) => {
      let areaId = area.properties.area_id;

      areaData[areaId] = { ...area.properties };
      areaData[areaId]['coordinates'] = [];
      area.geometry.coordinates[0].forEach((coordinate) => {
        areaData[areaId]['coordinates'].push({
          lat: coordinate[1],
          lng: coordinate[0],
        });
      });
      areaData[areaId].center = calculateCenter(areaData[areaId].coordinates);
    });

    res = await axios.get('https://kyupid-api.vercel.app/api/users');

    res.data.users.forEach((user) => {
      let areaId = user.area_id;
      let area = areaData[areaId];

      //   userCount
      area.userCount = area.userCount + 1 || 1;

      //   proUserCount
      if (user.is_pro_user) {
        area.proUserCount = area.proUserCount + 1 || 1;
      }

      //   maleCount && femaleCount
      if (user.gender === 'M') {
        area.maleCount = area.maleCount + 1 || 1;
      } else {
        area.femaleCount = area.femaleCount + 1 || 1;
      }

      //   ageSum
      area.ageSum = area.ageSum + user.age || 1;

      //   matchs
      area.matchs = area.matchs + user.total_matches || 1;
    });

    Object.keys(areaData).forEach((key) => {
      if (!areaData[key].maleCount) areaData[key].maleCount = 0;
      if (!areaData[key].femaleCount) areaData[key].femaleCount = 0;

      // maleFemalRatio
      [areaData[key].maleFemalRatio, areaData[key].maleFemalRatioText] =
        calculateRatio(areaData[key].maleCount, areaData[key].femaleCount);

      areaData[key].maleFemalRatio = areaData[key].maleFemalRatio.toFixed(2);

      // avgAge
      areaData[key].avgAge = areaData[key].ageSum / areaData[key].userCount;
      areaData[key].avgAge = areaData[key].avgAge.toFixed(0);

      // avgMatch
      areaData[key].avgMatch = areaData[key].matchs / areaData[key].userCount;
      areaData[key].avgMatch = areaData[key].avgMatch.toFixed(0);
    });

    return areaData;
  } catch (err) {
    console.log(err);
    return {};
  }
};

const calculateRatio = (num_1 = 0, num_2 = 0) => {
  for (let num = num_2; num > 1; num--) {
    if (num_1 % num === 0 && num_2 % num === 0) {
      num_1 = num_1 / num;
      num_2 = num_2 / num;
    }
  }
  var ratio = num_1 + ':' + num_2;
  return [num_1 / num_2, ratio];
};

const calculateCenter = (coordinates) => {
  let centroid = [0.0, 0.0];
  coordinates.forEach((coordinate) => {
    centroid[0] += coordinate.lat;
    centroid[1] += coordinate.lng;
  });
  centroid[0] /= coordinates.length;
  centroid[1] /= coordinates.length;

  return { lat: centroid[0], lng: centroid[1] };
};

export const mapValues = (areas, option) => {
  if (!areas) return;
  let minVal = Infinity;
  let maxVal = -Infinity;
  let val = {};

  Object.keys(areas).forEach((key) => {
    if (option === 'maleFemalRatio') {
      if (areas[key][option]) {
        minVal = Math.min(minVal, areas[key][option]);
        maxVal = Math.max(minVal, areas[key][option]);
      }
    } else {
      if (areas[key][option]) {
        minVal = Math.min(minVal, areas[key][option]);
        maxVal = Math.max(maxVal, areas[key][option]);
      }
    }
  });

  Object.keys(areas).forEach((key) => {
    let value = (areas[key][option] - minVal) / (maxVal - minVal);

    if (val === 0) val += 0.3;

    val[key] = {
      fillColor: '#5f6061',
      strokeColor: '#3b3d40',
      fillOpacity: value,
      strokeOpacity: 0.8,
      strokeWeight: 1,
    };
  });

  return val;
};
