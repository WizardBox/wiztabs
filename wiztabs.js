//WizardBoxTabs BASIC v.1.3 (06-19-2016). It recommended for use with the animation libary from D.Eden (http://daneden.github.io/animate.css/)
;(function ( $ )
	{
		$.fn.wiztabs = function(options)
		{
			var tabsWrap = this;

			var settings = $.extend(
				{
					animationIn: 'bounceInLeft',
					animationOut: 'bounceOutLeft',
					timer: 340,
					switchGroup: tabsWrap,
					targetGroupHDelay: 750,
					targetGroupH: true,
					callbackFun: function()
					{
					},
				},options);
			if( settings.deinitialize === 'true' )
			{
				return
			}
			var animation = settings.animation;
			var animationIn = settings.animationIn;
			var animationOut = settings.animationOut;
			var timer = settings.timer;
			var targetGroupHDelay = settings.targetGroupHDelay;
			var targetGroupH = settings.targetGroupH;
			var switchGroup = settings.switchGroup;
			var switchItems = switchGroup.find('[data-switch]');
			var switchOn = switchGroup.find('[data-switch-state="1"]');
			var switchOff = switchGroup.find('[data-switch-state="0"]');
			var switchOnIndex = (switchOn).attr('data-switch');
			var targetGroup = tabsWrap.find('[data-target-group]');
			var targetItems = targetGroup.find('[data-target]');
			selectHeightChange(switchOn, switchOnIndex);
		
			/*==================Initialize Tabs================*/
			switchItems.on('click', function()
				{
					var curSwitch = $(this);
					var switchIndex = (curSwitch).attr('data-switch');
					selectHeightChange(curSwitch, switchIndex);
					if( (curSwitch).attr('data-switch-state') !== "1" )
					{
						switchGroup
						.find('[data-switch-state="1"]')
						.attr('data-switch-state','0');

						curSwitch
						.attr('data-switch-state','1');

						targetGroup
						.find('[data-target-state="1"]')
						.attr('data-target-state','0')
						.attr('class', 'animated ' + animationOut);

						setTimeout(function()
							{
								targetGroup
								.find('[data-target='+switchIndex+']')
								.attr('class', 'animated '+ animationIn)
								.attr('data-target-state','1');
								settings.callbackFun();
							},timer);
					}
				});
			/*=====================HELPER FUNCTIONS=====================*/
			function calcFixHeight(targetItems)
			{
				targetHeightsArr = targetItems.map(function()
					{
						return $(this).outerHeight(true);
					}).get();
				var maxHeight = Math.max.apply(null, targetHeightsArr);
				targetGroup.css('height', maxHeight);
				return maxHeight;
			}

			function calcFluidHeight(curSwitch, switchIndex)
			{
				var nextTargetHeight = targetGroup.find('[data-target='+switchIndex+']').height();
				if(+targetGroup.height()>+nextTargetHeight)
				{
					setTimeout(function()
						{
						  targetGroup.css('height', nextTargetHeight);
						},targetGroupHDelay);
				}else
				{
					targetGroup.css('height', nextTargetHeight);
				}
				return nextTargetHeight;
			}
			function selectHeightChange(switchOn, switchOnIndex)
			{
				if(!(!isNaN(parseFloat(targetGroupH)) && isFinite(targetGroupH)))
				{
					if(targetGroupH)
					{
						calcFluidHeight(switchOn, switchOnIndex);
					}else
					{
						calcFixHeight(targetItems);
					}
				}else
				{
					targetGroup.css('height', settings.targetGroupH+'px')
				}
			}
			return this;
		};
	}( jQuery ));