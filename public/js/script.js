//MENU Side bar
const allMenu = document.querySelectorAll("main .contact-data .head .menu");

allMenu.forEach((item) => {
  const icon = item.querySelector(".icon");
  const menuLink = item.querySelector(".menu-link");

  icon.addEventListener("click", function () {
    menuLink.classList.toggle("show");
  });
});

window.addEventListener("click", function (e) {
  allMenu.forEach((item) => {
    const icon = item.querySelector(".icon");
    const menuLink = item.querySelector(".menu-link");
    if (e.target !== icon) {
      if (e.target !== menuLink) {
        if (menuLink.classList.contains("show")) {
          menuLink.classList.remove("show");
        }
      }
    }
  });
});

// Apexchart

var options = {
  series: [
    {
      name: "series1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "series2",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ],
  chart: {
    height: 350,
    type: "area",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: [
      "2018-09-19T00:00:00.000Z",
      "2018-09-19T01:30:00.000Z",
      "2018-09-19T02:30:00.000Z",
      "2018-09-19T03:30:00.000Z",
      "2018-09-19T04:30:00.000Z",
      "2018-09-19T05:30:00.000Z",
      "2018-09-19T06:30:00.000Z",
    ],
  },
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();
////////////////////////////////////////////////
// const form = document.getElementById("form");

// form.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const name = document.getElementById("name");
//     const logo = document.getElementById("logo");
//     const formData = new FormData();

//     formData.append("name", name.value);
//     formData.append("logo", logo.files[0]);

//     try {
//         const response = await fetch("http://localhost:8000/admin/addproviders", {
//             method: 'POST',
//             body: formData,
//         });

//         if (response.ok) {
//             console.log('Provider added successfully');
//         } else {
//             console.error('Failed to add provider');
//         }
//     } catch (error) {
//         console.error('Error during fetch:', error);
//     }
// });
