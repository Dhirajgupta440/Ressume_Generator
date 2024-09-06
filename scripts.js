function generateResume() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const github = document.getElementById('github').value;
    const linkedin = document.getElementById('linkedin').value;
    const summary = document.getElementById('summary').value;

    const educationEntries = document.querySelectorAll('.education-entry');
    let educationHTML = '';
    educationEntries.forEach((entry) => {
        const education10 = entry.querySelector('[name="education10"]')?.value || '';
        const education12 = entry.querySelector('[name="education12"]')?.value || '';
        const educationBtech = entry.querySelector('[name="educationBtech"]')?.value || '';
        const educationTitle = entry.querySelector('[name="educationTitle"]')?.value || '';
        const educationDescription = entry.querySelector('[name="educationDescription"]')?.value || '';

        if (education10 || education12 || educationBtech) {
            educationHTML += `
                <p><strong>10th Marks %:</strong> ${education10}</p>
                <p><strong>12th Marks %:</strong> ${education12}</p>
                <p><strong>BTech Marks %:</strong> ${educationBtech}</p>
                <br>`;
        } else if (educationTitle && educationDescription) {
            educationHTML += `<p><strong>${educationTitle}:</strong> ${educationDescription}</p><br>`;
        }
    });

    const experience = document.getElementById('experience').value;

    const skillsEntries = document.querySelectorAll('#skills-section input');
    let skillsHTML = '<ul>';
    skillsEntries.forEach((skill) => {
        if (skill.value) { // Only add non-empty skills
            skillsHTML += `<li>${skill.value}</li>`;
        }
    });
    skillsHTML += '</ul>';

    const resumeDisplay = document.getElementById('resume-display');
    resumeDisplay.innerHTML = `
        <h1>Resume</h1>
        <h2>${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>GitHub:</strong> <a href="${github}" target="_blank">${github}</a></p>
        <p><strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank">${linkedin}</a></p>
        <h3>Professional Summary</h3>
        <p>${summary}</p>
        <h3>Education</h3>
        ${educationHTML}
        <h3>Experience</h3>
        <p>${experience}</p>
        <h3>Skills</h3>
        ${skillsHTML}
    `;

    document.getElementById('download-btn').style.display = 'block';
}

function addEducation() {
    const educationSection = document.getElementById('education-section');
    
    // Hide the default education fields
    const defaultEducation = educationSection.querySelector('.education-entry');
    if (defaultEducation) {
        defaultEducation.style.display = 'none';
    }

    // Create a new education entry with a title and description field
    const newEducation = document.createElement('div');
    newEducation.classList.add('education-entry');
    newEducation.innerHTML = `
        <label for="educationTitle">Education Title:</label>
        <input type="text" name="educationTitle" required>

        <label for="educationDescription">Description:</label>
        <textarea name="educationDescription" required></textarea>
        <br>
    `;
    educationSection.appendChild(newEducation);
}

function addSkill() {
    const skillsSection = document.getElementById('skills-section');
    const newSkill = document.createElement('input');
    newSkill.setAttribute('type', 'text');
    newSkill.setAttribute('name', 'skills');
    newSkill.setAttribute('required', true);
    skillsSection.appendChild(newSkill);
}

function downloadResume() {
    const element = document.getElementById('resume-display');
    const opt = {
        margin:       1,
        filename:     'resume.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
}
