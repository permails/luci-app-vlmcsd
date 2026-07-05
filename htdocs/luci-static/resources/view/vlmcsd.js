'use strict';
'require form';
'require poll';
'require rpc';
'require view';
'require fs';

const callServiceList = rpc.declare({
	object: 'service',
	method: 'list',
	params: ['name'],
	expect: { '': {} }
});

function getServiceStatus() {
	return L.resolveDefault(callServiceList('vlmcsd'), {}).then(res =>
		res?.['vlmcsd']?.['instances']?.['vlmcsd']?.['running']
	);
}

function renderStatus(status) {
	const color = status ? 'green' : 'red';
	const service = _('Vlmcsd KMS Server');
	const running = status ? _('RUNNING') : _('NOT RUNNING');
	return `<em><span style="color:${color}"><strong>${service} ${running}</strong></span></em>`;
}

return view.extend({
	render() {
		const m = new form.Map('vlmcsd', _('Vlmcsd KMS Server'));

		let s = m.section(form.TypedSection);
		s.anonymous = true;
		s.render = function () {
			poll.add(function () {
				return L.resolveDefault(getServiceStatus()).then(function (res) {
					const stats = renderStatus(res);
					const view = document.getElementById('vlmcsd_status');
					view.innerHTML = stats;
				});
			});

			return E('div', { class: 'cbi-section', id: 'status_bar' }, [
				E('p', { id: 'vlmcsd_status' }, _('Collecting data…'))
			]);
		};

		s = m.section(form.NamedSection, 'config', 'vlmcsd');
		s.tab('general', _('General Settings'));
		s.tab('advanced', _('Advanced Settings'));
		s.tab('log', _('Activation Log'));
		s.tab('config_file', _('Configuration File'), _('Edit the content of the /etc/vlmcsd.ini file.'));

		// --- General Settings ---
		let o = s.taboption('general', form.Flag, 'enabled', _('Enable Vlmcsd KMS Server'));
		o.default = o.disabled;
		o.rmempty = false;

		o = s.taboption('general', form.Flag, 'auto_activate', _('Allow automatic activation'), _('Automatically add DNS SRV record to dnsmasq.'));
		o.default = o.enabled;
		o.rmempty = false;

		o = s.taboption('general', form.Flag, 'internet_access', _('Allow connection from Internet'));
		o.default = o.disabled;
		o.rmempty = false;
		
		o = s.taboption('general', form.Value, 'port', _('Listen Port'));
		o.default = '1688';
		o.datatype = 'port';
		o.rmempty = false;

		// --- Advanced Settings ---
		o = s.taboption('advanced', form.ListValue, 'lcid', _('Language / Region (LCID)'), _('Set the culture language for generated ePIDs.'));
		o.value('1033', _('English - US (1033)'));
		o.value('2052', _('Chinese - Simplified (2052)'));
		o.value('1028', _('Chinese - Traditional (1028)'));
		o.default = '1033';
		
		o = s.taboption('advanced', form.Value, 'max_workers', _('Max Workers'), _('Maximum number of concurrent workers.'));
		o.default = '4';
		o.datatype = 'uinteger';
		
		o = s.taboption('advanced', form.Value, 'activation_interval', _('Activation Interval'), _('How often unactivated clients should retry.'));
		o.default = '2h';
		o.placeholder = '2h';
		
		o = s.taboption('advanced', form.Value, 'renewal_interval', _('Renewal Interval'), _('How often activated clients should renew.'));
		o.default = '7d';
		o.placeholder = '7d';

		o = s.taboption('advanced', form.Flag, 'log_enabled', _('Enable Logging'), _('Write activation logs to /var/log/vlmcsd.log'));
		o.default = o.disabled;
		o.rmempty = false;

		o = s.taboption('advanced', form.Flag, 'log_verbose', _('Verbose Log'), _('Include detailed activation information in logs.'));
		o.default = o.disabled;
		o.rmempty = false;
		o.depends('log_enabled', '1');

		// --- Log Viewer ---
		o = s.taboption('log', form.DummyValue, '_log_view');
		o.rawhtml = true;
		o.load = function() {
			return fs.read_direct('/var/log/vlmcsd.log', 'text').then(function(res) {
				if (res && res.trim() !== '') {
					return '<textarea style="width: 100%; height: 400px; resize: none;" readonly="readonly">' + res + '</textarea>';
				}
				return '<textarea style="width: 100%; height: 400px; resize: none;" readonly="readonly">' + _('No log data available.') + '</textarea>';
			}).catch(function() {
				return '<textarea style="width: 100%; height: 400px; resize: none;" readonly="readonly">' + _('No log data available.') + '</textarea>';
			});
		};
		
		o = s.taboption('log', form.Button, '_clear_log', _('Clear Log'));
		o.inputstyle = 'remove';
		o.onclick = function() {
			return fs.write('/var/log/vlmcsd.log', '').then(function() {
				window.location.reload();
			});
		};

		// --- Config File ---
		o = s.taboption('config_file', form.TextValue, '_tmpl',
			null,
			_("This is the content of the file '/etc/vlmcsd.ini', you can edit it here, usually no modification is needed."));
		o.rows = 20;
		o.monospace = true;
		o.load = () => fs.trimmed('/etc/vlmcsd.ini').catch(() => '');
		o.write = (_, value) => fs.write('/etc/vlmcsd.ini', value.trim().replace(/\r\n/g, '\n') + '\n');

		return m.render();
	}
});
