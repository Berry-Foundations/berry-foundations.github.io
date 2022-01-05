// Berry Foundations

home = `
	<div class="banner">
		<center>
			<img id="Berry" src="Berry.png">
			<h1>Berry Foundations</h1>
		</center>
	</div>
`;

about = `
	<div class="about">
		<center>
			<img id="Berry" src="Berry.png">
			<h1>What is Berry Foundations?</h1>
			<p>
				Berry Foundations is a bot development organization.
				Here various bots are created.
				For safety, connecting, fun and more stuff.
			</p>
			<h1>Purpose of Berry Bots</h1>
			<p>
				These bots are made to innovate.
				To stop wasting time on simple things.
				The intension is not to replace humans.
				The intension is to make something useful, globally.
			</p>
			<h1>Bots and Services Prices</h1>
			<p>
				For most of the bots, they are completely free to use.
				At least for the software part, that is completely free.
				For services other than bot, that may depend.
				Visiting policies is suggested.
			</p>
		</center>
	</div>
`;

bots = `
	<div class="bots">
		<center>
			<img id="Berry" src="Berry.png">
			<h1>Berry Bots</h1>
		</center>
	</div>
`;

policy = `
	<div class="privacy">
		<center>
			<img id="Berry" src="Berry.png">
			<h1>Berry Policies</h1>
			<p>
				Berry Tech has some policies it follows.
				This includes terms and conditions.
				These exist for user safety, safety for content rights and other rights.
				All bots follow these policies and in case they don't, the policy not followed will be mentioned.
			</p>
`;

function changePage(to) {
	content = document.getElementById("content");
	if (to.toLowerCase() === "question") {
		content.innerHTML = about;
	} else if (to.toLowerCase() === "robot") {
		fetch("bots.json").then(req => req.json()).then(data => {
			bots = `
				<div class="bots">
					<center>
						<img id="Berry" src="Berry.png">
						<h1>Berry Bots</h1>
					`;
			for (let bot of data[0]["bots"]) {
				bot_card_template = `
					<div class="bot-card" style="background: ${bot["color"]["main"]};">
						<img class="bot-card-img" src="${bot["icon"]}" `;
				if (bot["color"]["need"]) {
					bot_card_template += `style="background: ${bot["color"]["extra"]}"`;
				}
				bot_card_template += `>
						</img>
						<p class="bot-card-title" style="color: ${bot["color"]["font"]};">
							${bot["name"]}
							<br>
							`;
				if (bot["type"] === "discord") {
					bot_card_template += `<i class="bot-card-ux fas fa-external-link-alt" onclick="window.open('${bot["links"]["website"]}')"></i>
							<i class="bot-card-ux fas fa-plus" onclick="window.open('${bot["links"]["add"]}')"></i>
							<i class='fab fa-discord fa-xs' style='opacity: 25%;'></i>
						`;
				}
				bot_card_template += `</p>
					</div>
				`;
				bots += bot_card_template;
			}
			bots += `</center>
				</div>`;
			content.innerHTML = bots;
		});
	} else if (to.toLowerCase() === "shield") {
		fetch("policy/user-safety.md").then(req => req.text()).then(data => {
			policy = `<div class="privacy">
				<center>
					<img id="Berry" src="Berry.png">
					<h1>Berry Policies</h1>
					<p>
						Berry Tech has some policies it follows.
						This includes terms and conditions.
						These exist for user safety, safety for content rights and other rights.
						All bots follow these policies and in case they don't, the policy not followed will be mentioned.
					</p>
					<h1>User Safety</h1>
					<p class="policy-content">
						`;
			for (let line of data.split('\n')) {
				policy += line + `<br>`;
			}
			policy += `</p><h1>Content Rights</h1><p class="policy-content">`;
			fetch('policy/content-rights.md').then(req2 => req2.text()).then(data2 => {
				for (let line of data2.split('\n')) {
					policy += line + `<br>`;
				}
				policy += `</p><h1>Bot Rights</h1><p class="policy-content">`;
				fetch('policy/bot-rights.md').then(req3 => req3.text()).then(data3 => {
					for (let line of data3.split('\n')) {
						policy += line + `<br>`;
					}
					policy += `</p><h1>Report Actions</h1><p class="policy-content">`;
					fetch('policy/report-actions.md').then(req5 => req5.text()).then(data5 => {
						for (let line of data5.split('\n')) {
							policy += line + `<br>`;
						}
						policy += `</p><h1>Licensing</h1><p class="policy-content">`;
						fetch('policy/licensing.md').then(req6 => req6.text()).then(data6 => {
							for (let line of data6.split('\n')) {
								policy += line + `<br>`;
							}
							policy += `</p><h1>Real Bot Identification</h1><p class="policy-content">`;
							fetch('policy/rbi-auth.md').then(req7 => req7.text()).then(data7 => {
								for (let line of data7.split('\n')) {
									policy += line + `<br>`;
								}
								policy += `</p></center></div>`;
								content.innerHTML = policy;
							});
						});
					});
				});
			});
		});
	} else {
		content.innerHTML = home;
	}
}

changePage('asia');

