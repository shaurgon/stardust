module.exports = {
  issuePrefixes: ['CHAT-'],
  bumpFiles: [
    { filename: 'package.json', type: 'json' },
  ],
  issueUrlFormat: 'https://issues.xsolla.com:8443/browse/{{prefix}}{{id}}',
  types: [
    { type: 'feat', section: 'Features' },
    { type: 'perf', section: 'Improvements' },
    { type: 'fix', section: 'Bug Fixes' },
    { type: 'chore', section: 'Other changes' },
    { type: 'docs', section: 'Other changes' },
    { type: 'style', section: 'Other changes' },
    { type: 'refactor', section: 'Other changes' },
    { type: 'test', section: 'Other changes' },
    { type: 'ci', section: 'Other changes' },
    { type: 'build', section: 'Other changes' },
    { type: 'revert', section: 'Other changes' },
  ],
};
