(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

//contact form
document.addEventListener('DOMContentLoaded', function (){

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault(); // Prevent default form submission

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    try {
        // Send POST request to the server
        const response = await fetch('http://localhost:4000/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, subject, message })
        });

        const data = await response.json();

        // Check if the message was sent successfully
        if (data.success) {
            alert("Message sent successfully!");
            // Optionally reset the form or clear the fields
            document.getElementById('contactForm').reset();
        } else {
            // Handle errors returned by the server
            alert(data.message || "There was an error sending the message. Please try again.");
        }
    } catch (error) {
        // Handle network or other errors
        console.error('Error:', error);
        alert("There was an error sending the message. Please try again.");
        }
    });
  }
});



//orderForm
document.addEventListener('DOMContentLoaded', function () {
    // Initialize DateTime Picker
    $('#datetimepicker').datetimepicker({
        format: 'YYYY-MM-DD HH:mm'
    });

    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', async function (e) {
            e.preventDefault(); // Prevent default form submission

            // Gather form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const datetime = document.getElementById('datetime').value;
            const select1 = document.getElementById('select1').value;
            const message = document.getElementById('message').value;

            // Send data to the backend
            try {
                const response = await fetch('http://localhost:4000/api/booking', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, datetime, select1, message }),
                });

                if (response.ok) {
                    const data = await response.json();
                    alert('Table booked successfully !!!'); // Display success message
                    orderForm.reset(); // Reset form
                } else {
                    const errorData = await response.json();
                    alert(errorData.message); // Display error message
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while placing your order.');
            }
        });
    }
});

//Restaurant food items

// fetchFoodItems();
document.addEventListener("DOMContentLoaded", () => {
    fetchFoodItems();
});

async function fetchFoodItems() {
    try {
        const response = await fetch('http://localhost:4000/api/restaurant/list');
        const result = await response.json();
        console.log("Fetched result:", result); // Log the entire response for debugging

        // Access the data property
        if (result.success && Array.isArray(result.data)) {
            const foodItemsContainer = document.getElementById('foodItemsContainer');
            if (foodItemsContainer) {
                // Split items into two columns
                const leftColumnItems = result.data.slice(0, 4);
                const rightColumnItems = result.data.slice(4, 8);

                foodItemsContainer.innerHTML = `
                    <div id="tab-1" class="tab-pane fade show p-0 active">
                        <div class="row g-4">
                            ${renderFoodItems(leftColumnItems)}
                            ${renderFoodItems(rightColumnItems)}
                        </div>
                    </div>
                `;
            } else {
                console.error("Error: 'foodItemsContainer' element not found.");
            }
        } else {
            console.error("Error: Expected 'success' to be true and 'data' to be an array.");
        }
    } catch (error) {
        console.error("Error fetching food items:", error);
    }
}

function renderFoodItems(items) {
    return items.map(item => `
        <div class="col-lg-6">
            <div class="d-flex align-items-center">
                <img class="flex-shrink-0 img-fluid rounded" src="http://localhost:4000/img/${item.image}" alt="${item.name}" style="width: 80px;">
                <div class="w-100 d-flex flex-column text-start ps-4">
                    <h5 class="d-flex justify-content-between border-bottom pb-2">
                        <span>${item.name}</span>
                        <span class="text-primary">$${item.price}</span>
                    </h5>
                    <small class="fst-italic">${item.description}</small>
                </div>
            </div>
        </div>
    `).join('');
}

// fetchTeamMembers();
document.addEventListener("DOMContentLoaded", () => {
    fetchTeamMembers();
});

async function fetchTeamMembers() {
    try {
        const response = await fetch('http://localhost:4000/team/list');
        const result = await response.json();
        console.log("Fetched result:", result); // Log the entire response for debugging

        // Access the data property
        if (result.success && Array.isArray(result.data)) {
            const teamMembers = document.getElementById('teamMembers');
            if (teamMembers) {
                // Split items into two columns
                const leftRowItems = result.data.slice(0, 4);
                const rightRowItems = result.data.slice(4, 8);

                teamMembers.innerHTML = `
                    <div id="tab-1" class="tab-pane fade show p-0 active">
                        <div class="row g-4">
                            ${renderTeamMembers(leftRowItems)}
                            ${renderTeamMembers(rightRowItems)}
                        </div>
                    </div>
                `;
            } else {
                console.error("Error: 'teamMembers' element not found.");
            }
        } else {
            console.error("Error: Expected 'success' to be true and 'data' to be an array.");
        }
    } catch (error) {
        console.error("Error fetching team members:", error);
    }
}

function renderTeamMembers(itemMap) {
    return itemMap.map(item => `
    <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div class="team-item text-center rounded overflow-hidden">
                <div class="rounded-circle overflow-hidden m-4">
                    <img class="img-fluid" src="http://localhost:4000/img/${item.image}" alt="${item.name}">
                </div>
                <h5 class="mb-0">${item.name}</h5>
                <small>${item.designation}</small>
                <div class="d-flex justify-content-center mt-3">
                    <a class="btn btn-square btn-primary mx-1" href=""><i class="fab fa-facebook-f"></i></a>
                    <a class="btn btn-square btn-primary mx-1" href=""><i class="fab fa-twitter"></i></a>
                    <a class="btn btn-square btn-primary mx-1" href=""><i class="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
    `).join('');
}

