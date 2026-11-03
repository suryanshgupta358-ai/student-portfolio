document.addEventListener("DOMContentLoaded", () => {
    const studentForm = document.getElementById("studentForm");
    const studentList = document.getElementById("studentList");

    // Function to load and display saved students from MongoDB
    async function loadStudents() {
        try {
            const response = await fetch("/api/students");
            const students = await response.json();
            
            studentList.innerHTML = "";
            
            if (students.length === 0) {
                studentList.innerHTML = `<div class="empty-state">No student portfolios found yet. Register one on the left!</div>`;
                return;
            }

            students.forEach(student => {
                const card = document.createElement("div");
                card.className = "student-card";
                
                // Format skills badges
                const skillsHtml = student.skills && student.skills.length > 0 
                    ? student.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('') 
                    : '<span class="skill-badge">None</span>';

                card.innerHTML = `
                    <div class="card-header">
                        <h3>${student.fullName}</h3>
                        <span class="course-tag">${student.course || 'Degree'}</span>
                    </div>
                    <p><strong>Email:</strong> ${student.email}</p>
                    <p><strong>Mobile:</strong> ${student.mobileNo}</p>
                    <p><strong>Gender:</strong> ${student.gender} | <strong>College:</strong> ${student.college}</p>
                    ${student.about ? `<p style="margin-top: 6px;"><strong>About:</strong> ${student.about}</p>` : ''}
                    <div class="skills-container">${skillsHtml}</div>
                `;
                studentList.appendChild(card);
            });
        } catch (error) {
            console.error("Error loading students:", error);
        }
    }

    // Handle Form Submission and Store Data
    if (studentForm) {
        studentForm.addEventListener("submit", async (e) => {
            e.preventDefault(); // Prevent page reload

            // Collect selected skills from the multiple select dropdown
            const skillsSelect = document.getElementById("skills");
            const selectedSkills = Array.from(skillsSelect.selectedOptions).map(option => option.value);

            // Gather all contact and portfolio details
            const formData = {
                fullName: document.getElementById("fullName").value,
                gender: document.getElementById("gender").value,
                email: document.getElementById("email").value,
                mobileNo: document.getElementById("mobileNo").value,
                course: document.getElementById("course").value,
                college: document.getElementById("college").value,
                about: document.getElementById("about").value,
                skills: selectedSkills
            };

            try {
                const response = await fetch("/api/students", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    studentForm.reset(); // Clear form fields
                    loadStudents(); // Refresh the portfolio list instantly
                } else {
                    const errData = await response.json();
                    alert("Failed to save profile: " + (errData.error || "Unknown error"));
                }
            } catch (error) {
                console.error("Error saving student:", error);
                alert("An error occurred while connecting to the server.");
            }
        });
    }

    // Initial load on page startup
    loadStudents();
});